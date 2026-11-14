import { cn } from '@/lib/utils';

type TickerItem = { text: string; highlight?: boolean };

// CSS-only marquee. The list is rendered twice so translateX(-50%) loops seamlessly.
export default function Ticker({ items }: { items: TickerItem[] }) {
	const renderItems = (hidden: boolean) =>
		items.map((item, i) => (
			<li
				key={`${hidden ? 'b' : 'a'}-${i}`}
				aria-hidden={hidden || undefined}
				className='flex items-center'
			>
				<span className={cn('mx-8', item.highlight && 'text-signal')}>
					{item.text}
				</span>
				<span aria-hidden className='text-border'>
					◆
				</span>
			</li>
		));

	return (
		<div className='overflow-hidden border-b bg-muted/50 py-3 font-mono text-xs tracking-widest whitespace-nowrap text-muted-foreground uppercase'>
			<ul className='flex w-max animate-marquee motion-reduce:animate-none'>
				{renderItems(false)}
				{renderItems(true)}
			</ul>
		</div>
	);
}
