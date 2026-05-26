import Image from 'next/image';
import { ProductPreview } from '@/types/Product';
import { sessionSchema, UserSchema } from '@/types/User';
import { Star } from 'lucide-react';
import { getProducts } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import { getUserFromSession } from '@/app/api/auth/core/session';
import BuyNowButton from './BuyNowButton';

export default async function ProductsGrid() {
	const user = (await getUserFromSession()) as sessionSchema;
	const dummyProds = (await getProducts()) as ProductPreview[];
	// if (user) console.log(user.userId);

	return (
		<>
			{dummyProds.map((product: ProductPreview) => (
				<div
					key={product.asin}
					className='flex flex-col justify-between p-4 bg-white dark:bg-[#182534] rounded-2xl outline-2 dark:outline-[#253648] outline-zinc-200 cursor-pointer'
				>
					<Link href={`/products/${product.asin}`}>
						<div className='relative h-60'>
							<Image
								src={product.thumbnail}
								alt={product.title}
								fill
								style={{ objectFit: 'contain' }}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
						</div>
						<h3 className='font-semibold mt-2'>{`${product.title.substring(0, 75)}...`}</h3>

						<p className='text-[#013f6b] dark:text-blue-400'>
							${product.price}
						</p>

						<div className='flex flex-row items-center mb-3'>
							<p className='mr-1'>{product.rating}</p>
							{[...Array(Math.round(product.rating))].map((_, i) => (
								<Star key={i} size={14} fill='gold' strokeWidth={0} />
							))}
						</div>
					</Link>
					<div className='flex flex-col justify-center items-center'>
						<AddToCartButton product={product} />
						{user && <BuyNowButton userId={user.userId} product={product} />}
					</div>
				</div>
			))}
		</>
	);
}
