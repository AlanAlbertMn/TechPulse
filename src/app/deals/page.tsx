import DealsGrid from '@/components/DealsGrid';
import FilterInput from '@/components/FilterInput';
import { deals } from '@/lib/deals';

const DealsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ sort?: string }>;
}) => {
	const { sort } = await searchParams;
	let sorted = deals.data.deals;
	if (sort !== 'featured' || undefined) {
		sorted = [...deals.data.deals].sort((a, b) => {
			if (sort === 'price-asc')
				return a.deal_price.amount - b.deal_price.amount;
			// if (sort === 'rating-desc') return b.rating - a.;
			if (sort === 'name-asc') return a.deal_title.localeCompare(b.deal_title);
			return b.deal_price.amount - a.deal_price.amount;
		});
	}
	return (
		<section className='max-w-7xl mx-auto py-10'>
			<div className='flex  justify-between items-center'>
				<h1 className='text-4xl my-6'>Deals</h1>
				<FilterInput />
			</div>

			<DealsGrid deals={sorted} />
		</section>
	);
};

export default DealsPage;
