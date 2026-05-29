import { prisma } from '@/lib/prisma';

export async function getProducts() {
	return await prisma.product.findMany();
}

export async function getProduct(asin: string) {
	return await prisma.product.findFirst({ where: { asin } });
}

export async function getProductById(id: number) {
	return await prisma.product.findFirst({ where: { id } });
}
