import Image from 'next/image';
import { Star } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import BuyNowButton from './BuyNowButton';
import { ProductPreview } from '@/types/Product';
import { sessionSchema } from '@/types/User';

const ProductCard = async ({
	product,
	user,
}: {
	product: ProductPreview;
	user: sessionSchema;
}) => {
	return (
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

				<div className='flex gap-1 items-center'>
					<p className='text-xl text-[#013f6b] font-medium dark:text-blue-400'>
						${product.price.toFixed(2)}
					</p>
					{product.original_price && (
						<p className='text-gray-400 text-decoration: line-through'>
							${product.original_price.toFixed(2)}
						</p>
					)}
				</div>

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
	);
};

export default ProductCard;
