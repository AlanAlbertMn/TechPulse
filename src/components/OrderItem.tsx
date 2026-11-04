import { getProductById } from '@/lib/products';
import { OrderItem } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const OrderItemCard = async (item: OrderItem) => {
	// TODO: once OrderItem has a real relation to Product, include it in
	// getOrders() instead of querying once per item (N+1 queries).
	const product = await getProductById(Number(item.productId));
	const productHref = product ? `/products/${product.asin}` : null;
	return (
		<div className='bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-cyan-500/30 transition-all'>
			<div className='flex gap-4'>
				<div className='relative h-24 w-24'>
					{item.image && (
						<Image
							src={item.image}
							alt={item.name}
							fill
							sizes='96px'
							style={{ objectFit: 'contain' }}
							className='w-24 h-24 rounded-2xl object-cover'
						/>
					)}
				</div>

				<div className='flex-1'>
					<div className='flex justify-between'>
						<div>
							<h3 className='font-semibold text-lg'>{item.name}</h3>
						</div>

						<span className='text-slate-400 text-sm'>Qty: {item.quantity}</span>
					</div>

					<div className='mt-6 flex items-center justify-between'>
						<div>
							<p className='text-slate-400 text-sm'>
								{item.quantity > 1
									? `${item.quantity} × $${item.price.toFixed(2)}`
									: 'Item amount'}
							</p>

							<p className='text-2xl font-bold'>
								${(item.price * item.quantity).toFixed(2)}
							</p>
						</div>

						{/* A <Link> inside a <button> is invalid HTML; style the link instead */}
						{productHref && (
							<Link
								href={productHref}
								className='grid place-items-center w-28 rounded-xl hover:scale-[1.02] mb-2 text-white bg-[#2563EB] hover:bg-[#1a4196] h-10 text-sm font-medium transition-all'
							>
								Product page
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItemCard;
