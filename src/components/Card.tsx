import { CalendarBlankIcon, CheckCircleIcon, ClockIcon } from '@phosphor-icons/react/ssr';
import { OrderWithItems } from '@/types/Order';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import OrderItemCard from './OrderItem';

const OrderCard = (order: OrderWithItems) => {
	const paid = order.status === 'paid';
	const units = order.items.reduce((n, item) => n + item.quantity, 0);
	const date = order.createdAt.toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});

	return (
		<Card className='gap-0 overflow-hidden rounded-xl p-0'>
			<header className='flex flex-col gap-4 border-b bg-muted/30 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6'>
				<div>
					<p className='mb-2 flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase'>
						<CalendarBlankIcon className='size-3.5' />
						<time dateTime={order.createdAt.toISOString()}>{date}</time>
						<span className='text-border'>{'//'}</span>
						{units} {units === 1 ? 'unit' : 'units'}
					</p>
					<h2 className='flex items-center gap-3 font-display text-3xl font-black tracking-tighter'>
						<span>
							<span className='text-muted-foreground'>Nº</span>{' '}
							{String(order.id).padStart(4, '0')}
						</span>
						<Badge
							variant='outline'
							className={cn(
								'gap-1 rounded-sm font-mono text-[10px] tracking-widest uppercase',
								paid ? 'border-signal/40 text-signal' : 'text-muted-foreground',
							)}
						>
							{paid ? <CheckCircleIcon weight='fill' /> : <ClockIcon />}
							{order.status}
						</Badge>
					</h2>
				</div>
				<div className='sm:text-right'>
					<p className='mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase'>
						Total
					</p>
					<p className='font-mono text-4xl leading-none font-extralight tracking-tighter'>
						${order.totalAmount.toFixed(2)}
					</p>
				</div>
			</header>
			<ul className='divide-y'>
				{order.items.map((item) => (
					<li key={item.id}>
						<OrderItemCard {...item} />
					</li>
				))}
			</ul>
		</Card>
	);
};

export default OrderCard;
