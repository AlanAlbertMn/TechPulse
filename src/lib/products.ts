import { prisma } from '@/lib/prisma';
import { ProductDetails } from '@/types/Product';

export async function getProducts() {
	return await prisma.product.findMany();
}

export async function getProduct(asin: string) {
	return await prisma.product.findFirst({ where: { asin } });
}

export async function getProductById(id: number) {
	return await prisma.product.findFirst({ where: { id } });
}

export async function updateProductWithDetails(productDetails: ProductDetails) {
	return await prisma.product.upsert({
		create: productDetails,
		update: productDetails,
		where: { asin: productDetails.asin },
	});
}
