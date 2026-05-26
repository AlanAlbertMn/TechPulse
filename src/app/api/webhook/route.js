import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createOrder, populateOrderItems } from '../../../lib/orders';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSigningSecret = process.env.ENDPOINT_SIGNING_SECRET;

export async function POST(request) {
	const body = await request.text();
	const headersList = await headers();
	const sig = headersList.get('stripe-signature');

	let event;
	try {
		event = stripeClient.webhooks.constructEvent(
			body,
			sig,
			endpointSigningSecret,
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const userId = Number(event.data.object.metadata.userId);
			const amount_total = event.data.object.amount_total / 100;
			const status = event.data.object.status;

			//Create new order and populate order items based on lastRowId
			const result = await createOrder(userId, amount_total, 'card', status);

			if (result == null)
				return NextResponse.json(
					{ error: 'Unable to create new order' },
					{ status: 400 },
				);

			const orderId = result.lastInsertRowid;
			const cart = await JSON.parse(event.data.object.metadata.cart);

			await populateOrderItems(orderId, cart);

			break;

		default:
			console.log('Event does not match any registered types: ' + error.type);
	}

	return new Response(null, { status: 200 });
}
