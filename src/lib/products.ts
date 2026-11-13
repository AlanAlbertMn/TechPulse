import 'server-only';
import { prisma } from '@/lib/prisma';
import { ProductDetails } from '@/types/Product';

export async function getProducts() {
	return await prisma.product.findMany({ orderBy: { id: 'asc' } });
}

export async function getProduct(asin: string) {
	return await prisma.product.findUnique({ where: { asin } });
}

export async function getProductById(id: number) {
	return await prisma.product.findUnique({ where: { id } });
}

export async function updateProductWithDetails(productDetails: ProductDetails) {
	return await prisma.product.upsert({
		create: productDetails,
		update: productDetails,
		where: { asin: productDetails.asin },
	});
}

// Same-brand items first, then the best-rated of the rest
export async function getRelatedProducts(asin: string, brand: string | null, take = 4) {
	const others = await prisma.product.findMany({
		where: { NOT: { asin } },
		orderBy: { rating: 'desc' },
	});
	const sameBrand = brand ? others.filter((p) => p.brand === brand) : [];
	const rest = others.filter((p) => !sameBrand.includes(p));
	return [...sameBrand, ...rest].slice(0, take);
}
