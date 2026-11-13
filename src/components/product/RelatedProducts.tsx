'use client';

import { motion } from 'motion/react';
import type { Product } from '@prisma/client';
import ProductCard from '@/components/ProductCard';
import type { sessionSchema } from '@/types/User';

export default function RelatedProducts({
	products,
	user,
}: {
	products: Product[];
	user: sessionSchema;
}) {
	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'>
			{products.map((product, index) => (
				<motion.div
					key={product.id}
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.15 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
				>
					<ProductCard product={product} user={user} />
				</motion.div>
			))}
		</div>
	);
}
