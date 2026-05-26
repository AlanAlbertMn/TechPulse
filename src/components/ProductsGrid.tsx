import Image from 'next/image';
import { Product } from '@/types/Product';
import { Star } from 'lucide-react';
import { getProducts } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import { getUserFromSession } from '@/app/api/auth/core/session';
import { sessionSchema } from '@/types/User';
import BuyNowButton from './BuyNowButton';

export default async function ProductsGrid() {
	const user = (await getUserFromSession()) as sessionSchema;
	const dummyProds = getProducts() as Product[];

	return (
		<>
			{dummyProds.map((product: Product) => (
				<div
					key={product.asin}
					className='flex flex-col justify-between p-4 bg-white dark:bg-[#182534] rounded-2xl outline-2 dark:outline-[#253648] outline-zinc-200 cursor-pointer'
				>
					<Link href={`/products/${product.asin}`}>
						<Image
							src={product.product_photo}
							alt={product.product_title}
							height={300}
							width={300}
							className='rounded-xl mb-2 max-h-36 lg:max-h-40'
						/>

						<h3 className='font-semibold mt-2'>{`${product.product_title.substring(0, 75)}...`}</h3>

						<p className='text-[#013f6b] dark:text-blue-400'>
							{product.product_price}
						</p>

						<div className='flex flex-row items-center mb-3'>
							<p className='mr-1'>{product.product_star_rating}</p>
							{[...Array(parseInt(product.product_star_rating))].map((_, i) => (
								<Star key={i} size={14} fill='gold' strokeWidth={0} />
							))}
						</div>
					</Link>
					<div className='flex flex-col w-full'>
						<AddToCartButton product={product} />
						{user && <BuyNowButton userId={user.userId} product={product} />}
					</div>
				</div>
			))}
		</>
	);
}
