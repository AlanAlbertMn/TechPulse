// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Example: Insert initial data
	await prisma.product.create({
		data: {
			asin: 'B0FQFB8FMG',
			product_title:
				'Apple AirPods Pro 3 Wireless Earbuds, Active Noise Cancellation, Live Translation, Heart Rate Sensing, Hearing Aid Feature, Bluetooth Headphones, Spatial Audio, High-Fidelity Sound, USB-C Charging',
			product_price: '$183.99',
			product_original_price: null,
			product_star_rating: 4.4,
			product_num_ratings: 7223,
			product_photo:
				'https://m.media-amazon.com/images/I/61solmQSSlL._AC_UL960_QL65_.jpg',
			delivery: null,
		},
	});
	console.log('Database seeded successfully.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
