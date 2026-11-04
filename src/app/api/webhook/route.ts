import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import {
	createOrder,
	orderExistsForStripeSession,
	type NewOrderItem,
} from '@/lib/orders';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSigningSecret = process.env.ENDPOINT_SIGNING_SECRET!;

export async function POST(request: Request) {
	// The raw body is required for signature verification
	const body = await request.text();
	const sig = request.headers.get('stripe-signature');
	if (!sig) {
		return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
	}

	let event: Stripe.Event;
	try {
		event = stripeClient.webhooks.constructEvent(
			body,
			sig,
			endpointSigningSecret,
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Invalid signature' },
			{ status: 400 },
		);
	}

	switch (event.type) {
		case 'checkout.session.completed': {
			const session = event.data.object;

			// Async payment methods can complete the session before the money
			// arrives; only create the order once it is actually paid.
			if (session.payment_status !== 'paid') break;

			const userId = Number(session.metadata?.userId);
			if (!Number.isInteger(userId)) {
				console.error('Checkout session without a valid userId', session.id);
				break;
			}

			// Stripe delivers events "at least once": skip sessions we already
			// turned into an order (saves an API call; the unique constraint in
			// createOrder still protects against concurrent duplicates).
			if (await orderExistsForStripeSession(session.id)) break;

			// Read the purchased items back from Stripe instead of trusting
			// metadata (which is also capped at 500 chars per value).
			const lineItems = await stripeClient.checkout.sessions.listLineItems(
				session.id,
				{ limit: 100, expand: ['data.price.product'] },
			);

			const items: NewOrderItem[] = lineItems.data.map((li) => {
				const product = li.price?.product as Stripe.Product;
				return {
					productId: product.metadata.productId,
					name: product.name,
					price: (li.price?.unit_amount ?? 0) / 100,
					quantity: li.quantity ?? 1,
					image: product.images[0] ?? '',
				};
			});

			try {
				await createOrder({
					userId,
					totalAmount: (session.amount_total ?? 0) / 100,
					paymentMethod: 'card',
					status: 'paid',
					stripeSessionId: session.id,
					items,
				});
			} catch (error) {
				console.error(error);
				// Non-2xx makes Stripe retry the webhook later
				return NextResponse.json(
					{ error: 'Unable to create new order' },
					{ status: 500 },
				);
			}
			break;
		}

		default:
			console.log('Unhandled Stripe event type: ' + event.type);
	}

	return new Response(null, { status: 200 });
}
