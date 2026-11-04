import 'server-only';

import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export type NewOrderItem = {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
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

export async function orderExistsForStripeSession(stripeSessionId: string) {
	const order = await prisma.order.findUnique({
		where: { stripeSessionId },
		select: { id: true },
	});
	return order !== null;
}

/**
 * Creates an order. When `stripeSessionId` is given the call is idempotent:
 * if an order for that Checkout Session already exists (e.g. Stripe retried
 * the webhook, possibly concurrently) it returns `null` instead of creating
 * a duplicate.
 */
export async function createOrder({
	userId,
	totalAmount,
	paymentMethod,
	status = 'pending',
	stripeSessionId,
	items,
}: {
	userId: number;
	totalAmount: number;
	paymentMethod?: string;
	status?: string;
	stripeSessionId?: string;
	items: NewOrderItem[];
}) {
	try {
		return await prisma.order.create({
			data: {
				user: { connect: { id: userId } },
				totalAmount,
				status,
				paymentMethod,
				stripeSessionId,
				items: { create: items },
			},
			include: {
				items: true,
			},
		});
	} catch (error) {
		// P2002 = unique constraint violation -> this session was already recorded
		if (
			stripeSessionId &&
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			return null;
		}
		throw error;
	}
}
