import { sessionSchema } from '@/types/User';
import { getProducts } from '@/lib/products';
import { getUserFromSession } from '@/app/api/auth/core/session';
import dynamic from 'next/dynamic';
import { Product } from '@prisma/client';
const ProductCard = dynamic(() => import('./ProductCard'));

export default async function ProductsGrid({
	sortBy,
}: {
	sortBy: string | undefined;
}) {
	const user = (await getUserFromSession()) as sessionSchema;
	const dummyProds = (await getProducts()) as Product[];
	console.log(sortBy);

	let sorted = dummyProds;
	if (sortBy !== 'featured' || undefined) {
		sorted = [...dummyProds].sort((a, b) => {
			if (sortBy === 'price-asc') return a.price - b.price;
			if (sortBy === 'rating-desc') return b.rating - a.rating;
			if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
			return b.price - a.price;
		});
	}

	return (
		<>
			{sorted.map((product: Product) => (
				<ProductCard key={product.id} product={product} user={user} />
			))}
		</>
	);
}
