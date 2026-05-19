import { prisma } from '@/lib/prisma';

export async function getProducts() {
	// new Promise((resolve) => setTimeout(resolve, 2000));
	return await prisma.product.findMany();
}

export function getProduct(asin) {
	console.log(asin);

	// new Promise((resolve) => setTimeout(resolve, 2000));
	return db.prepare('SELECT * FROM products WHERE asin = ?').get(asin);
}
