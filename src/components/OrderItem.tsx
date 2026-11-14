import { getProductById } from '@/lib/products';
import { OrderItem } from '@prisma/client';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/components/ui/button';
import SpecimenPlate from './SpecimenPlate';

const OrderItemCard = async (item: OrderItem) => {
	// TODO: once OrderItem has a real relation to Product, include it in
	// getOrders() instead of querying once per item (N+1 queries).
	const product = await getProductById(Number(item.productId));
	const productHref = product ? `/products/${product.asin}` : null;
	return (
		<div className='group/item flex gap-4 p-3 sm:gap-6 sm:pr-6'>
			{item.image ? (
				<SpecimenPlate
					src={item.image}
					alt={item.name}
					sizes='96px'
					className='size-20 shrink-0 rounded-lg sm:size-24'
					imageClassName='p-3 transition-transform duration-700 ease-out-expo group-hover/item:scale-105'
				/>
			) : (
				<div className='size-20 shrink-0 rounded-lg bg-muted sm:size-24' />
			)}

			<div className='flex min-w-0 flex-1 flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div className='min-w-0'>
					<h3
						title={item.name}
						className='line-clamp-2 font-display text-lg leading-tight font-black tracking-tight'
					>
						{item.name}
					</h3>
					<p className='mt-1 font-mono text-[11px] text-muted-foreground'>
						{item.quantity} × ${item.price.toFixed(2)}
					</p>
				</div>

				<div className='flex items-center justify-between gap-6 sm:justify-end'>
					<p className='font-mono text-2xl font-extralight tracking-tight'>
						${(item.price * item.quantity).toFixed(2)}
					</p>
					{productHref && (
						<Button
							variant='outline'
							size='sm'
							nativeButton={false}
							render={<Link href={productHref} />}
							className='gap-1.5 font-mono text-[11px] tracking-widest uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent'
						>
							View <ArrowUpRightIcon weight='bold' />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderItemCard;
