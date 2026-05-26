import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
	const body = await request.json();

	const stripeCart = body.cart.map((item) => ({
		price_data: {
			currency: 'usd',
			product_data: {
				name: item.product.product_title.split(' ').slice(0, 5).join(' '),
				images: [item.product.product_photo],
				metadata: { productId: item.product.id },
			},
			unit_amount: Math.round(
				parseFloat(item.product.product_price.replace('$', '')) * 100,
			),
		},
		quantity: item.quantity,
	}));

	const session = await stripeClient.checkout.sessions.create({
		success_url: process.env.NEXT_PUBLIC_URL + '/success',
		cancel_url: process.env.NEXT_PUBLIC_URL + '/cart',
		line_items: stripeCart,
		mode: 'payment',
		metadata: {
			cart: JSON.stringify(stripeCart),
			userId: body.userId,
		},
	});

	return NextResponse.json(session);
}
