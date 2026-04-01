import AddToCartButton from '@/components/AddToCartButton';
import { getProduct } from '@/lib/products';
import { Product } from '@/types/Product';
import { Star } from 'lucide-react';
import Image from 'next/image';

async function ProductDetails({
	params,
}: {
	params: Promise<{ product: string }>;
}) {
	const { product } = await params;
	// console.log(product);

	const prod: Product = await getProduct(product);
	console.log(prod);

	return (
		<section className='bg-slate-950/70 w-full'>
			<div className='mx-auto w-7xl py-36 flex gap-10'>
				<div className='mx-auto relative w-full h-3/4'>
					<Image
						src={prod.product_photo}
						alt={prod.product_title}
						width={500}
						height={500}
						className='rounded-xl'
					/>
				</div>
				<div>
					<div>
						<h2 className='text-2xl font-bold pb-1'>{prod.product_title}</h2>
						<p className='py-3'>SKU: {prod.asin}</p>
						<div className='flex items-center mb-3'>
							<p className='pr-2'>{prod.product_star_rating}</p>
							{[...Array(parseInt(prod.product_star_rating))].map((_, i) => (
								<Star color='gold' key={i} size={20} />
							))}
							<p className='ml-2 border-2 border-cyan-700 bg-cyan-900 px-3 rounded-xl'>
								{prod.product_num_ratings} reviews
							</p>
						</div>
					</div>
					<hr className='border-cyan-100' />
					<div className='py-3'>
						<h2 className='text-3xl text-amber-400 py-3'>
							{prod.product_price}
						</h2>
						{prod.product_original_price && (
							<p className='text-xs text-gray-400 pb-7'>
								Previous price:{' '}
								<span className='line-through'>
									{prod.product_original_price}
								</span>
							</p>
						)}
						<p>{prod.sales_volume}</p>
						<p>{prod.delivery}</p>
						<AddToCartButton product={prod} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProductDetails;
