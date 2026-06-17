import Image from 'next/image';
import { Deal } from './DealsGrid';

const DealCard = (deal: Deal) => {
	return (
		<div className='bg-slate-700 rounded-2xl grid grid-cols-5 justify-around items-center p-4 gap-4'>
			<div className='relative h-72 w-full col-span-2 overflow-hidden rounded-xl'>
				<Image
					src={deal.deal_photo}
					alt={deal.deal_title}
					fill
					style={{ objectFit: 'cover' }}
					sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>
			<div className='flex flex-col gap-3 col-span-3'>
				<div>
					<p>{deal.deal_type}</p>
					<p className='text-xl font-semibold'>{deal.deal_title}</p>
				</div>
				<p className='text-xs text-zinc-400'>{deal.product_asin}</p>
				<div>
					<p>{deal.deal_state}</p>
					<div className='flex gap-3'>
						<p className='line-through text-zinc-400'>{`$${deal.list_price.amount.toFixed(2)} ${deal.list_price.currency}`}</p>
						<p className='bg-red-500 text-white font-bold w-24 rounded-2xl px-4'>
							{deal.deal_badge}
						</p>
					</div>
					<p className='text-xl text-amber-300'>{`$${deal.deal_price.amount.toFixed(2)} ${deal.deal_price.currency}`}</p>
				</div>
			</div>
		</div>
	);
};

export default DealCard;
