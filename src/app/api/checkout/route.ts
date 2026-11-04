import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getUserFromSession } from '@/app/api/auth/core/session';
import type { RedisUser } from '@/types/User';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

const MAX_QUANTITY = 99;

type CheckoutBody = {
	cart?: { product?: { id?: unknown }; quantity?: unknown }[];
};

export async function POST(request: Request) {
	// The user is taken from the session cookie, never from the request body,
	// otherwise anyone could place orders on behalf of another account.
	const user = (await getUserFromSession()) as RedisUser | null;
	if (!user) {
		return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
	}

	let body: CheckoutBody;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	// Only trust product ids and quantities from the client.
	const requested = new Map<number, number>();
	for (const item of body.cart ?? []) {
		const id = Number(item?.product?.id);
		const quantity = Number(item?.quantity);
		if (
			!Number.isInteger(id) ||
			!Number.isInteger(quantity) ||
			quantity < 1 ||
			quantity > MAX_QUANTITY
		) {
			return NextResponse.json({ error: 'Invalid cart' }, { status: 400 });
		}
		requested.set(id, Math.min((requested.get(id) ?? 0) + quantity, MAX_QUANTITY));
	}
	if (requested.size === 0) {
		return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
	}

	// Prices come from the database. Using item.product.price from the body
	// would let a user edit localStorage / the request and pay $0.01.
	const products = await prisma.product.findMany({
		where: { id: { in: [...requested.keys()] } },
	});
	if (products.length !== requested.size) {
		return NextResponse.json(
			{ error: 'Some products no longer exist' },
			{ status: 400 },
		);
	}

	const lineItems = products.map((product) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: product.title.split(' ').slice(0, 5).join(' '),
					images: [product.thumbnail],
					metadata: { productId: String(product.id) },
				},
				unit_amount: Math.round(product.price * 100),
			},
			quantity: requested.get(product.id)!,
		}));

	const session = await stripeClient.checkout.sessions.create({
		success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.APP_URL}/cart`,
		line_items: lineItems,
		mode: 'payment',
		client_reference_id: String(user.userId),
		// Stripe metadata values are limited to 500 chars, so the cart is NOT
		// stored here; the webhook reads the line items back from Stripe.
		metadata: { userId: String(user.userId) },
	});

	// Only return what the client needs, not the whole session object.
	return NextResponse.json({ url: session.url });
}
