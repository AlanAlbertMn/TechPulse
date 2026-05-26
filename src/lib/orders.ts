'use server';

import { prisma } from '@/lib/prisma';

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

export async function getOrders(userId: number) {
	return await prisma.order.findMany({
		where: { userId },
		include: { items: true },
		orderBy: {
			createdAt: 'desc',
		},
	});
}

export async function createOrder(
	user_id: string,
	total_amount: number,
	payment_method: string,
	cart: cartItem[],
	status?: string,
) {
	if (status) {
		return await prisma.order.create({
			data: {
				user: {
					connect: {
						id: Number(user_id),
					},
				},
				totalAmount: total_amount,
				status: 'paid',
				items: {
					create: cart.map((item) => ({
						productId:
							item.price_data.product_data.metadata.productId.toString(),
						name: item.price_data.product_data.name,
						price: item.price_data.unit_amount / 100,
						quantity: item.quantity,
						image: item.price_data.product_data.images[0],
					})),
				},
			},
			include: {
				items: true,
			},
		});
	} else {
		return await prisma.order.create({
			data: {
				user: {
					connect: {
						id: Number(user_id),
					},
				},
				totalAmount: total_amount,
				items: {
					create: cart.map((item) => ({
						productId:
							item.price_data.product_data.metadata.productId.toString(),
						name: item.price_data.product_data.name,
						price: item.price_data.unit_amount / 100,
						quantity: item.quantity,
						image: item.price_data.product_data.images[0],
					})),
				},
			},
			include: {
				items: true,
			},
		});
	}
}
