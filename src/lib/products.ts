import { prisma } from '@/lib/prisma';

export async function getProducts() {
	// new Promise((resolve) => setTimeout(resolve, 2000));
	return await prisma.product.findMany();
}

export async function getProduct(asin: string) {
	return await prisma.product.findFirst({ where: { asin } });
}
