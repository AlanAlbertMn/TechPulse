'use server';

import sql from 'better-sqlite3';
const db = sql('techpulse.db');

type cartItem = {
	price_data: {
		currency: string;
		product_data: {
			name: string;
			images: string[];
			metadata: { productId: number };
		};
		unit_amount: number;
	};
	quantity: number;
};

export async function createOrder(
	user_id: number,
	total_amount: number,
	payment_method: string,
	status?: string,
) {
	if (status) {
		return db
			.prepare(
				'INSERT INTO orders (user_id, total_amount, status, payment_method) VALUES (?, ?, ?, ?)',
			)
			.run(user_id, total_amount, status, payment_method);
	} else {
		return db
			.prepare(
				'INSERT INTO orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)',
			)
			.run(user_id, total_amount, payment_method);
	}
}

export async function populateOrderItems(orderId: number, cart: cartItem[]) {
	for (const item of cart) {
		console.log(item.price_data.product_data);

		db.prepare(
			`INSERT INTO order_items 
        (order_id, product_id, name, price, quantity, image)
        VALUES (?, ?, ?, ?, ?, ?)`,
		).run(
			orderId,
			item.price_data.product_data.metadata.productId,
			item.price_data.product_data.name,
			item.price_data.unit_amount / 100,
			item.quantity,
			item.price_data.product_data.images[0] || '',
		);
	}
}
