import { OrderItem } from '@prisma/client';
import Image from 'next/image';

const OrderItemCard = (item: OrderItem) => {
	return (
		<div className='bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-cyan-500/30 transition-all'>
			<div className='flex gap-4'>
				<img src={item.image} className='w-24 h-24 rounded-2xl object-cover' />

				<div className='flex-1'>
					<div className='flex justify-between'>
						<div>
							<h3 className='font-semibold text-lg'>{item.name}</h3>
						</div>

						<span className='text-emerald-400 text-sm'>Delivered</span>
					</div>

					<div className='mt-6 flex items-center justify-between'>
						<div>
							<p className='text-slate-400 text-sm'>item Total</p>

							<p className='text-2xl font-bold'>${item.price}</p>
						</div>

						<button className='bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-xl text-sm font-medium transition-all'>
							Details
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItemCard;
