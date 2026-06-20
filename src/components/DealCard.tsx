import Image from 'next/image';
import { Deal } from './DealsGrid';
import { BadgeDollarSignIcon } from 'lucide-react';

const DealCard = (deal: Deal) => {
	return (
		<div
			className='dark:bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.35),transparent_35%),linear-gradient(135deg,#020617,#0f172a_45%,#020617)] 
		bg-slate-50 rounded-2xl grid grid-cols-5 justify-around items-center p-4 gap-4'
		>
			<div className='relative h-72 w-full col-span-2 bg-white overflow-hidden rounded-xl'>
				<Image
					src={deal.deal_photo}
					alt={deal.deal_title}
					fill
					style={{ objectFit: 'contain' }}
					sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>
			<div className='flex flex-col gap-3 col-span-3 p-5'>
				<div>
					<div className='flex text-white bg-amber-500 rounded-2xl h-8 w-32 justify-center items-center mb-2'>
						<BadgeDollarSignIcon color='white' />
						<p className='text-white bg-amber-500 w-24 rounded-4xl text-center'>
							{deal.deal_type.replace('_', ' ')}
						</p>
					</div>
					<p className='text-xl text-slate-900 dark:text-slate-50 font-semibold hover:text-amber-500'>
						{deal.deal_title}
					</p>
				</div>
				<p className='text-xs text-zinc-500'>{deal.product_asin}</p>
				<div>
					<p className='text-zinc-400'>{deal.deal_state}</p>
					<div className='flex gap-3'>
						<p className='line-through text-zinc-400'>{`$${deal.list_price.amount.toFixed(2)} ${deal.list_price.currency}`}</p>
						<p className='bg-red-500 text-white font-bold w-24 rounded-2xl px-4'>
							{deal.deal_badge}
						</p>
					</div>
					<p className='text-xl font-semibold text-amber-500'>{`$${deal.deal_price.amount.toFixed(2)} ${deal.deal_price.currency}`}</p>
				</div>
			</div>
		</div>
	);
};

export default DealCard;
