import * as motion from 'motion/react-client';
import DealsGrid from '@/components/DealsGrid';
import FilterInput from '@/components/FilterInput';
import { deals } from '@/lib/deals';
import PageShell from '@/components/layout/PageShell';
import PageHeader from '@/components/layout/PageHeader';
import StatList from '@/components/layout/StatList';
import Ticker from '@/components/home/Ticker';
import { rise } from '@/lib/motion';

const DealsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ sort?: string }>;
}) => {
	const { sort } = await searchParams;
	let sorted = deals.data.deals;
	if (sort && sort !== 'featured') {
		sorted = [...deals.data.deals].sort((a, b) => {
			if (sort === 'price-asc')
				return a.deal_price.amount - b.deal_price.amount;
			// if (sort === 'rating-desc') return b.rating - a.;
			if (sort === 'name-asc') return a.deal_title.localeCompare(b.deal_title);
			return b.deal_price.amount - a.deal_price.amount;
		});
	}

	// Display-only figures for the header and ticker
	const all = deals.data.deals;
	const topDiscount = Math.max(...all.map((d) => d.savings_percentage));
	const avgDiscount = Math.round(
		all.reduce((sum, d) => sum + d.savings_percentage, 0) / all.length,
	);
	const biggestSaving = all.reduce((a, b) =>
		b.savings_amount.amount > a.savings_amount.amount ? b : a,
	);
	const cheapest = all.reduce((a, b) =>
		b.deal_price.amount < a.deal_price.amount ? b : a,
	);
	const tickerItems = [
		{ text: `${all.length} live deals` },
		{ text: `Up to ${topDiscount}% off`, highlight: true },
		{
			text: `Biggest saving: $${biggestSaving.savings_amount.amount.toFixed(2)} on ${biggestSaving.deal_title.split(' ').slice(0, 3).join(' ')}`,
		},
		{ text: `Deals from $${cheapest.deal_price.amount.toFixed(2)}` },
		{ text: 'Deals open on Amazon' },
	];

	return (
		<PageShell banner={<Ticker items={tickerItems} />}>
			<PageHeader
				crumb='Deals'
				title={['DEAL', 'FEED.']}
				aside={
					<StatList
						stats={[
							{ label: 'Live deals', value: String(all.length).padStart(2, '0') },
							{ label: 'Top discount', value: `${topDiscount}%` },
							{ label: 'Avg discount', value: `${avgDiscount}%` },
						]}
					/>
				}
			/>

			{/* Sticky sort bar, bleeding to the container edges */}
			<motion.div
				variants={rise}
				className='sticky top-0 z-40 -mx-6 -mt-12 mb-10 flex flex-col items-start justify-between gap-4 border-b bg-background/80 lg:-mt-16 px-6 py-4 backdrop-blur-xl md:-mx-12 md:flex-row md:items-center md:px-12'
			>
				<FilterInput />
				<span className='font-mono text-xs whitespace-nowrap text-muted-foreground'>
					{sorted.length} DEALS
				</span>
			</motion.div>

			<DealsGrid deals={sorted} featureFirst={!sort || sort === 'featured'} />
		</PageShell>
	);
};

export default DealsPage;
