import AddToCartButton from '@/components/AddToCartButton';
import ProductImageCarrousel from '@/components/ProductImageCarrousel';
import { Star } from 'lucide-react';
import { getProduct, updateProductWithDetails } from '@/lib/products';
import { type ProductDetails } from '@/types/Product';
import axios from 'axios';
import { notFound } from 'next/navigation';

// Named ProductPage so it doesn't shadow the imported ProductDetails type
async function ProductPage({
	params,
}: {
	params: Promise<{ product: string }>;
}) {
	const { product } = await params;
	let prod = await getProduct(product);
	if (!prod) notFound();

	if (prod.images.length === 0) {
		// To consume the api directly
		const apiUrl = process.env.NEXT_PUBLIC_API_URL + 'product-details';
		const paramsForAxios = {
			asin: product,
			country: 'US',
		};
		const headers = {
			'x-rapidapi-key': process.env.API_KEY || '',
			'x-rapidapi-host': process.env.API_HOST || '',
			'Content-Type': 'application/json',
		};
		const { data } = await axios.get(apiUrl, {
			headers,
			params: paramsForAxios,
		});
		const productDets = data.data;
		// The API returns prices both as '19.99' and '$23.00'
		const toNumber = (value: unknown) => {
			const n = parseFloat(String(value ?? '').replace(/[^0-9.]/g, ''));
			return Number.isFinite(n) ? n : undefined;
		};
		const productForUpdate: ProductDetails = {
			asin: prod.asin,
			thumbnail: productDets.product_photo || prod.thumbnail,
			title: productDets.product_title || prod.title,
			rating: toNumber(productDets.product_star_rating) ?? prod.rating,
			// Checkout charges this price, so never fall back to a made-up value
			price: toNumber(productDets.product_price) ?? prod.price,
			original_price: toNumber(productDets.product_original_price),
			description: productDets.product_description || undefined,
			images: productDets.product_photos || undefined,
			num_ratings: productDets.product_num_ratings ?? prod.num_ratings,
			delivery_price: productDets.delivery_price || 'FREE',
			// Don't persist today's date: it would be stored and shown forever
			delivery_time: productDets.delivery_time || undefined,
			sales_volume: productDets.sales_volume || undefined,
			about_product: productDets.about_product || undefined,
			brand: productDets.product_details?.Brand || undefined,
		};
		//fetch from API and save into db
		prod = await updateProductWithDetails(productForUpdate);
	}

	return (
		<section className='bg-[#F8FAFC] text-slate-950/50 dark:bg-slate-950/70 w-full'>
			{prod && (
				<div className='mx-auto w-11/12 mb-4 md:py-12 flex flex-col md:flex-row gap-10'>
					<ProductImageCarrousel
						photo={prod.thumbnail}
						title={prod.title}
						photoArr={prod.images}
					/>
					<div>
						<div>
							{/* {prod.product_details.Brand && (
							<p>Brand: {prod.product_details.Brand}</p>
						)} */}
							<h2 className='md:text-2xl font-semibold pb-3 max-w-175 leading-tight text-[#013f6b] dark:text-slate-200'>
								{prod.title}
							</h2>
							{prod.brand && (
								<small className='dark:text-slate-200'>{prod.brand}</small>
							)}
							<p className='py-1 dark:text-slate-200'>SKU: {prod.asin}</p>
							{prod.sales_volume && (
								<p className='py-1 text-xs font-bold dark:text-slate-200'>
									{prod.sales_volume}
								</p>
							)}
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
						<div className='py-3 grid grid-cols-2'>
							<div className=''>
								<h2 className='text-3xl text-slate-950 font-medium dark:text-amber-400 py-4'>
									${prod.price.toFixed(2)}
								</h2>
								{prod.original_price && (
									<p className='text-xs text-gray-400 pb-4'>
										Previous price:{' '}
										<span className='line-through'>
											${prod.original_price.toFixed(2)}
										</span>
									</p>
								)}
							</div>
							<div className='pt-10 flex flex-col gap-6'>
								{prod.delivery_time && (
									<p className='text-slate-600 dark:text-amber-50 text-end'>
										{`Delivery for ${prod.delivery_price} on ${prod.delivery_time}`}
									</p>
								)}
								<div className='w-full flex flex-col items-end'>
									<div className='w-full'>
										<AddToCartButton product={prod} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default ProductPage;
