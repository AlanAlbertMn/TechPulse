import { ProductPreview } from '@/types/Product';
import { sessionSchema } from '@/types/User';
import { getProducts } from '@/lib/products';
import { getUserFromSession } from '@/app/api/auth/core/session';
import dynamic from 'next/dynamic';
const ProductCard = dynamic(() => import('./ProductCard'));

export default async function ProductsGrid() {
	const user = (await getUserFromSession()) as sessionSchema;
	const dummyProds = (await getProducts()) as ProductPreview[];

	return (
		<>
			{dummyProds.map((product: ProductPreview) => (
				<ProductCard key={product.asin} product={product} user={user} />
			))}
		</>
	);
}
