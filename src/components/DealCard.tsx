import { ArrowUpRightIcon, LightningIcon } from '@phosphor-icons/react/ssr';
import { Deal } from './DealsGrid';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SpecimenPlate from './SpecimenPlate';
import { cn } from '@/lib/utils';

const money = (n: number) => `$${n.toFixed(2)}`;

type DealCardProps = {
	deal: Deal;
	/** Wide layout for the lead deal in the grid */
	featured?: boolean;
};

const DealCard = ({ deal, featured = false }: DealCardProps) => {
	return (
		<Card
			className={cn(
				'group/deal h-full gap-0 rounded-2xl py-0 ring-border transition-all duration-500 ease-out-expo hover:shadow-[0_0_40px_-15px_var(--signal-glow)] hover:ring-muted-foreground/60',
				featured && 'lg:flex-row',
			)}
		>
			<div className={cn('p-3', featured && 'lg:w-1/2')}>
				<SpecimenPlate
					src={deal.deal_photo}
					alt=''
					sizes={
						featured
							? '(max-width: 1024px) 100vw, 40vw'
							: '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw'
					}
					className={cn('h-56', featured && 'h-72 lg:h-full lg:min-h-96')}
					imageClassName='p-6 transition-transform duration-700 ease-out-expo group-hover/deal:-translate-y-2 group-hover/deal:scale-105'
				>
					<Badge className='absolute top-3 left-3 z-10 rounded-sm bg-signal font-mono font-extrabold text-signal-foreground'>
						−{deal.savings_percentage}%
					</Badge>
				</SpecimenPlate>
			</div>

			<CardContent
				className={cn(
					'flex flex-1 flex-col gap-2 px-5 pt-2 pb-5',
					featured && 'lg:justify-center lg:p-10',
				)}
			>
				<p className='flex items-center gap-2 font-mono text-[10px] tracking-widest text-signal uppercase'>
					{featured ? (
						<span className='size-1.5 rounded-full bg-signal animate-signal-pulse' />
					) : (
						<LightningIcon weight='fill' />
					)}
					{deal.deal_type.replaceAll('_', ' ')}
				</p>

				<h3
					title={deal.deal_title}
					className={cn(
						'line-clamp-2 font-display text-lg leading-tight font-black',
						featured && 'line-clamp-3 text-3xl lg:text-4xl',
					)}
				>
					{deal.deal_title}
				</h3>

				<div className='flex flex-wrap items-baseline gap-x-2 font-mono'>
					<span className={cn('text-xl', featured && 'text-3xl')}>
						{money(deal.deal_price.amount)}
					</span>
					<span className='text-sm text-muted-foreground line-through'>
						{money(deal.list_price.amount)}
					</span>
					<span className='text-xs text-signal'>
						Save {money(deal.savings_amount.amount)}
					</span>
				</div>

				<div className={cn('mt-auto pt-3', featured && 'sm:max-w-xs lg:mt-0 lg:pt-6')}>
					<Button
						variant='outline'
						nativeButton={false}
						render={
							<a href={deal.deal_url} target='_blank' rel='noopener noreferrer' />
						}
						className='h-10 w-full gap-2 text-xs font-extrabold tracking-wide uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent'
					>
						View deal on Amazon
						<ArrowUpRightIcon
							weight='bold'
							className='transition-transform duration-300 ease-out-expo group-hover/deal:translate-x-0.5 group-hover/deal:-translate-y-0.5'
						/>
						<span className='sr-only'>(opens in a new tab)</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default DealCard;
