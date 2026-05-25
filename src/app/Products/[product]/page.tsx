import AddToCartButton from '@/components/AddToCartButton';
import ImageCarrousel from '@/components/ImageCarrousel';
import { Star } from 'lucide-react';
import BuyNowButton from '@/components/BuyNowButton';
import { getUserFromSession } from '@/app/api/auth/core/session';
import { sessionSchema } from '@/types/User';
import { getProduct } from '@/lib/products';
import { type ProductDetails } from '@/types/Product';
// import axios from 'axios';

async function ProductDetails({
	params,
}: {
	params: Promise<{ product: string }>;
}) {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const { product } = await params;
	console.log(product);
	const user = (await getUserFromSession()) as sessionSchema;
	const prod = (await getProduct(product)) as ProductDetails;
	console.log(prod);

	// To consume the api directly
	// const apiUrl = process.env.NEXT_PUBLIC_API_URL + 'product-details';
	// const paramsForAxios = {
	// 	asin: product,
	// 	country: 'US',
	// };
	// const headers = {
	// 	'x-rapidapi-key': process.env.API_KEY || '',
	// 	'x-rapidapi-host': process.env.API_HOST || '',
	// 	'Content-Type': 'application/json',
	// };
	// const { data } = await axios.get(apiUrl, { headers, params: paramsForAxios });
	// console.log(data.data);
	// const prod = data.data;

	return (
		<section className='bg-[#F8FAFC] text-slate-950/50 dark:bg-slate-950/70 w-full'>
			{prod && (
				<div className='mx-auto w-8/12 py-12 flex gap-10'>
					<ImageCarrousel
						photo={prod.thumbnail}
						title={prod.title}
						photoArr={prod.images}
					/>
					<div>
						<div>
							{/* {prod.product_details.Brand && (
							<p>Brand: {prod.product_details.Brand}</p>
						)} */}
							<h2 className='text-2xl font-semibold py-5 max-w-175 leading-tight text-[#013f6b] dark:text-slate-200'>
								{prod.title}
							</h2>
							<p className='py-3 dark:text-slate-200'>SKU: {prod.asin}</p>
							<div className='flex items-center mb-5'>
								<p className='pr-2 dark:text-slate-200'>{prod.rating}</p>
								{[...Array(Math.round(prod.rating))].map((_, i) => (
									<Star strokeWidth={0} fill='gold' key={i} size={20} />
								))}
								<p className='ml-2 border-2 text-white border-cyan-700 bg-cyan-900 px-3 rounded-xl'>
									{prod.num_ratings} reviews
								</p>
							</div>
						</div>
						<hr className='border-cyan-100' />
						<div className='py-3'>
							<h2 className='text-3xl text-amber-400 py-4'>${prod.price}</h2>
							{prod.original_price && (
								<p className='text-xs text-gray-400 pb-4'>
									Previous price:{' '}
									<span className='line-through'>{prod.original_price}</span>
								</p>
							)}
							{prod.sales_volume && (
								<p className='dark:text-slate-200'>{prod.sales_volume}</p>
							)}
							<AddToCartButton product={prod} />

							{user && <BuyNowButton userId={user.userId} product={prod} />}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default ProductDetails;
