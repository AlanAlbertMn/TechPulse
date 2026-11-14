import Link from 'next/link';
import axios from 'axios';
import { notFound } from 'next/navigation';
import * as motion from 'motion/react-client';
import {
	BarcodeIcon,
	CaretRightIcon,
	ShieldCheckIcon,
	TruckIcon,
} from '@phosphor-icons/react/ssr';
import type { Product } from '@prisma/client';
import {
	getProduct,
	getRelatedProducts,
	updateProductWithDetails,
} from '@/lib/products';
import { type ProductDetails } from '@/types/Product';
import { getUserFromSession } from '@/app/api/auth/core/session';
import { sessionSchema } from '@/types/User';
import {
	discountPercent,
	parseFeature,
	splitTitle,
	titleSizeClass,
} from '@/lib/productText';
import { cn } from '@/lib/utils';
import ProductGallery from '@/components/product/ProductGallery';
import PurchasePanel from '@/components/product/PurchasePanel';
import RatingStars from '@/components/product/RatingStars';
import RelatedProducts from '@/components/product/RelatedProducts';
import SiteFooter from '@/components/home/SiteFooter';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { EASE_OUT_EXPO, rise, stagger } from '@/lib/motion';

// Lazily enrich a product with the marketplace's detail payload the first time it's viewed
async function ensureDetails(prod: Product) {
	if (prod.images.length > 0) return prod;

	const apiUrl = process.env.NEXT_PUBLIC_API_URL + 'product-details';
	const headers = {
		'x-rapidapi-key': process.env.API_KEY || '',
		'x-rapidapi-host': process.env.API_HOST || '',
		'Content-Type': 'application/json',
	};
	const { data } = await axios.get(apiUrl, {
		headers,
		params: { asin: prod.asin, country: 'US' },
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
	return updateProductWithDetails(productForUpdate);
}

// Marketplace descriptions are often boilerplate ("Product Description … An Amazon Brand")
function cleanDescription(description: string | null) {
	if (!description) return null;
	const text = description
		.replace(/Product Description|From the Manufacturer/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return text.length > 60 ? text : null;
}

const pageStagger = stagger(0.15);

async function ProductPage({
	params,
}: {
	params: Promise<{ product: string }>;
}) {
	const { product } = await params;
	const found = await getProduct(product);
	if (!found) notFound();

	const [prod, user] = await Promise.all([
		ensureDetails(found),
		getUserFromSession() as Promise<sessionSchema>,
	]);
	const related = await getRelatedProducts(prod.asin, prod.brand);

	const { name, subtitle } = splitTitle(prod.title);
	const discount = discountPercent(prod.price, prod.original_price);
	const images = Array.from(new Set([prod.thumbnail, ...prod.images]));
	const features = prod.about_product.map(parseFeature);
	const description = cleanDescription(prod.description);

	const specs: [string, string | null][] = [
		['Brand', prod.brand],
		['ASIN', prod.asin],
		['Rating', `${prod.rating.toFixed(1)} / 5`],
		['Ratings', prod.num_ratings.toLocaleString('en-US')],
		['Popularity', prod.sales_volume],
		['Price', `$${prod.price.toFixed(2)}`],
		['List price', prod.original_price ? `$${prod.original_price.toFixed(2)}` : null],
		['Delivery', prod.delivery_price],
		['Est. arrival', prod.delivery_time],
	];

	return (
		<main>
			{/* PRODUCT HERO */}
			<section className='relative isolate overflow-hidden border-b'>
				<div aria-hidden className='absolute inset-0 -z-10 bg-blueprint' />
				<div
					aria-hidden
					className='absolute -top-48 right-0 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,var(--signal-bloom),transparent_65%)]'
				/>

				<div className='mx-auto max-w-[1400px] px-6 pt-8 pb-16 md:px-12 lg:pb-24'>
					<nav
						aria-label='Breadcrumb'
						className='mb-8 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase lg:mb-12'
					>
						<Link href='/' className='transition-colors hover:text-foreground'>
							Catalog
						</Link>
						<CaretRightIcon className='text-border' />
						<span className='truncate text-signal'>{prod.brand ?? 'Hardware'}</span>
					</nav>

					<div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20'>
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1, ease: EASE_OUT_EXPO }}
							className='lg:sticky lg:top-8 lg:self-start'
						>
							<ProductGallery title={prod.title} images={images} />
						</motion.div>

						<motion.div
							initial='hidden'
							animate='show'
							variants={pageStagger}
							className='flex flex-col'
						>
							<motion.p
								variants={rise}
								className='mb-4 font-mono text-xs tracking-widest text-signal uppercase'
							>
								{prod.brand ?? 'Hardware'} {'//'} {prod.asin}
							</motion.p>

							<motion.h1
								variants={rise}
								title={prod.title}
								className={cn(
									'mb-4 line-clamp-3 font-display leading-[0.95] font-black tracking-tighter text-balance',
									titleSizeClass(name),
								)}
							>
								{name}
							</motion.h1>

							{subtitle && (
								<motion.p
									variants={rise}
									className='mb-6 line-clamp-4 max-w-xl text-lg leading-relaxed font-extralight text-muted-foreground'
								>
									{subtitle}
								</motion.p>
							)}

							<motion.div
								variants={rise}
								className='mb-8 flex flex-wrap items-center gap-x-3 gap-y-2'
							>
								<RatingStars rating={prod.rating} />
								<span className='font-mono text-sm'>{prod.rating.toFixed(1)}</span>
								<span className='font-mono text-sm text-muted-foreground'>
									({prod.num_ratings.toLocaleString('en-US')} ratings)
								</span>
								{prod.sales_volume && (
									<Badge variant='outline' className='font-mono text-muted-foreground'>
										{prod.sales_volume}
									</Badge>
								)}
							</motion.div>

							<motion.div variants={rise} className='mb-6 flex flex-wrap items-end gap-4'>
								<span className='font-mono text-6xl leading-none font-extralight tracking-tighter'>
									${prod.price.toFixed(2)}
								</span>
								{discount && (
									<span className='flex items-center gap-2 pb-1'>
										<span className='font-mono text-muted-foreground line-through'>
											${prod.original_price!.toFixed(2)}
										</span>
										<Badge className='rounded-sm bg-signal font-mono font-extrabold text-signal-foreground'>
											−{discount}%
										</Badge>
									</span>
								)}
							</motion.div>

							{prod.delivery_time && (
								<motion.p
									variants={rise}
									className='mb-8 flex items-center gap-2 text-sm text-muted-foreground'
								>
									<span className='size-2 rounded-full bg-signal animate-signal-pulse' />
									<span className='font-extrabold text-foreground'>
										{prod.delivery_price ?? 'Standard'} delivery
									</span>
									— arrives {prod.delivery_time}
								</motion.p>
							)}

							<motion.div variants={rise} className='mb-10'>
								<PurchasePanel product={prod} signedIn={Boolean(user)} />
							</motion.div>

							<motion.dl
								variants={rise}
								className='grid grid-cols-1 gap-6 border-t border-border/60 pt-6 sm:grid-cols-3'
							>
								{[
									{
										icon: <TruckIcon />,
										label: 'Delivery',
										value: prod.delivery_price ?? 'At checkout',
									},
									{
										icon: <ShieldCheckIcon />,
										label: 'Secure checkout',
										value: 'Powered by Stripe',
									},
									{ icon: <BarcodeIcon />, label: 'SKU', value: prod.asin },
								].map((item) => (
									<div key={item.label} className='flex items-start gap-3'>
										<span className='text-xl text-muted-foreground'>{item.icon}</span>
										<div>
											<dt className='text-xs font-extrabold'>{item.label}</dt>
											<dd className='mt-0.5 font-mono text-[11px] text-muted-foreground'>
												{item.value}
											</dd>
										</div>
									</div>
								))}
							</motion.dl>
						</motion.div>
					</div>
				</div>
			</section>

			{/* OVERVIEW + SPECS */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
				className='mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-16 md:px-12 lg:grid-cols-[1.4fr_1fr] lg:py-24'
			>
				<div>
					<p className='mb-3 font-mono text-xs tracking-widest text-signal uppercase'>
						01 {'//'} Overview
					</p>
					<h2 className='mb-6 font-display text-4xl leading-none font-black tracking-tighter md:text-6xl'>
						The rundown.
					</h2>
					{description && (
						<p className='mb-10 max-w-prose text-lg font-extralight text-muted-foreground'>
							{description}
						</p>
					)}

					{features.length > 0 ? (
						<ol className='grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2'>
							{features.map((feature, i) => (
								<li key={i} className='flex gap-4'>
									<span className='grid size-10 shrink-0 place-items-center rounded-full border bg-muted/40 font-mono text-xs text-signal'>
										{String(i + 1).padStart(2, '0')}
									</span>
									<div>
										{feature.heading && (
											<h3 className='mb-1 font-display text-base font-black'>
												{feature.heading}
											</h3>
										)}
										<p className='text-sm leading-relaxed text-muted-foreground'>
											{feature.body}
										</p>
									</div>
								</li>
							))}
						</ol>
					) : (
						<p className='text-muted-foreground'>No feature notes for this item yet.</p>
					)}
				</div>

				<div className='lg:sticky lg:top-8 lg:self-start'>
					<p className='mb-3 font-mono text-xs tracking-widest text-signal uppercase'>
						02 {'//'} Specifications
					</p>
					<Card className='rounded-2xl py-1 ring-border'>
						<Table>
							<TableBody>
								{specs
									.filter((row): row is [string, string] => Boolean(row[1]))
									.map(([label, value]) => (
										<TableRow key={label} className='hover:bg-muted/40'>
											<TableCell className='w-2/5 py-4 pl-5 text-muted-foreground'>
												{label}
											</TableCell>
											<TableCell className='py-4 pr-5 font-mono whitespace-normal'>
												{value}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</Card>
				</div>
			</motion.section>

			{/* RELATED */}
			{related.length > 0 && (
				<section className='mx-auto max-w-[1400px] border-t px-6 py-16 md:px-12 lg:py-24'>
					<p className='mb-3 font-mono text-xs tracking-widest text-signal uppercase'>
						03 {'//'} Related
					</p>
					<h2 className='mb-10 font-display text-4xl leading-none font-black tracking-tighter md:text-6xl'>
						You might also like.
					</h2>
					<RelatedProducts products={related} user={user} />
				</section>
			)}

			<SiteFooter />
		</main>
	);
}

export default ProductPage;
