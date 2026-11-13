import Link from 'next/link';
import { StarIcon } from '@phosphor-icons/react';
import { Product } from '@prisma/client';
import AddToCartButton from '@/components/AddToCartButton';
import BuyNowButton from './BuyNowButton';
import { sessionSchema } from '@/types/User';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import SpecimenPlate from './SpecimenPlate';
import { discountPercent } from '@/lib/productText';

type ProductCardProps = {
	product: Product;
	user: sessionSchema;
	/** Wide, always-expanded layout for the lead product in the grid */
	featured?: boolean;
};

const ProductCard = ({ product, user, featured = false }: ProductCardProps) => {
	const discount = discountPercent(product.price, product.original_price);
	const href = `/products/${product.asin}`;

	return (
		<Card
			className={cn(
				'group/product h-full gap-0 rounded-2xl py-0 ring-border transition-all duration-500 ease-out-expo hover:shadow-[0_0_40px_-15px_var(--signal-glow)] hover:ring-muted-foreground/60',
				featured && 'lg:flex-row',
			)}
		>
			<Link
				href={href}
				tabIndex={-1}
				aria-hidden
				className={cn('relative block p-3', featured && 'lg:w-1/2')}
			>
				<SpecimenPlate
					src={product.thumbnail}
					alt=''
					sizes={
						featured
							? '(max-width: 1024px) 100vw, 40vw'
							: '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw'
					}
					className={cn('h-56', featured && 'h-72 lg:h-full lg:min-h-96')}
					imageClassName='p-6 transition-transform duration-700 ease-out-expo group-hover/product:-translate-y-2 group-hover/product:scale-105'
				>
					{discount && (
						<Badge className='absolute top-3 left-3 z-10 rounded-sm bg-signal font-mono font-extrabold text-signal-foreground'>
							−{discount}%
						</Badge>
					)}
				</SpecimenPlate>
			</Link>

			<CardContent
				className={cn(
					'flex flex-1 flex-col gap-2 px-5 pt-2 pb-5',
					featured && 'lg:justify-center lg:p-10',
				)}
			>
				{featured && (
					<span className='mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-signal uppercase'>
						<span className='size-1.5 rounded-full bg-signal animate-signal-pulse' />
						Lead unit
					</span>
				)}
				<p className='flex items-center gap-1.5 font-mono text-xs text-muted-foreground uppercase'>
					<span className='truncate'>{product.brand ?? 'Hardware'}</span>
					<span>{'//'}</span>
					<StarIcon weight='fill' className='shrink-0 text-signal' />
					{product.rating.toFixed(1)}
					<span className='text-muted-foreground/60'>
						({product.num_ratings.toLocaleString('en-US')})
					</span>
				</p>

				<Link href={href} className='focus-visible:outline-none'>
					<h3
						className={cn(
							'line-clamp-2 font-display text-lg leading-tight font-black transition-colors group-hover/product:text-foreground',
							featured && 'line-clamp-3 text-3xl lg:text-4xl',
						)}
					>
						{product.title}
					</h3>
				</Link>

				{featured && product.about_product[0] && (
					<p className='line-clamp-3 max-w-prose text-base font-extralight text-muted-foreground'>
						{product.about_product[0]}
					</p>
				)}

				<div className='flex items-baseline gap-2 font-mono'>
					<span className={cn('text-xl', featured && 'text-3xl')}>
						${product.price.toFixed(2)}
					</span>
					{discount && (
						<span className='text-sm text-muted-foreground line-through'>
							${product.original_price!.toFixed(2)}
						</span>
					)}
				</div>

				{/* Actions reveal on hover/focus on desktop; always visible on touch */}
				<div
					className={cn(
						'mt-auto flex flex-col gap-2 pt-3',
						!featured &&
							'transition-all duration-500 ease-out-expo md:translate-y-3 md:opacity-0 md:group-focus-within/product:translate-y-0 md:group-focus-within/product:opacity-100 md:group-hover/product:translate-y-0 md:group-hover/product:opacity-100',
						featured && 'sm:flex-row',
					)}
				>
					<AddToCartButton product={product} />
					{user && <BuyNowButton product={product} />}
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
