import { getProductById } from '@/lib/products';
import { OrderItem } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const OrderItemCard = async (item: OrderItem) => {
	const product = await getProductById(Number(item.productId));
	return (
		<div className='bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-cyan-500/30 transition-all'>
			<div className='flex gap-4'>
				<div className='relative h-24 w-24'>
					<Image
						src={item.image}
						alt={item.image}
						fill
						style={{ objectFit: 'contain' }}
						className='w-24 h-24 rounded-2xl object-cover'
					/>
				</div>

				<div className='flex-1'>
					<div className='flex justify-between'>
						<div>
							<h3 className='font-semibold text-lg'>{item.name}</h3>
						</div>

						<span className='text-emerald-400 text-sm'>Delivered</span>
					</div>

					<div className='mt-6 flex items-center justify-between'>
						<div>
							<p className='text-slate-400 text-sm'>Item amount</p>

							<p className='text-2xl font-bold'>${item.price.toFixed(2)}</p>
						</div>

						<button className='w-24 rounded-xl hover:scale-[1.02] mb-2 text-white bg-[#2563EB] hover:bg-[#1a4196] h-10 text-sm font-medium transition-all'>
							<Link href={`/products/${product?.asin}`}>Details</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItemCard;
