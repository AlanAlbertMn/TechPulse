import DealsGrid from '@/components/DealsGrid';
import FilterInput from '@/components/FilterInput';
import ProductsGrid from '@/components/ProductsGrid';
import { deals } from '@/lib/deals';

const DealsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ sort?: string }>;
}) => {
	const { sort } = await searchParams;
	return (
		<section className='max-w-7xl mx-auto py-10'>
			<div className='flex  justify-between items-center'>
				<h1 className='text-4xl my-6'>Deals</h1>
				<FilterInput />
			</div>

			<DealsGrid deals={deals.data.deals} />
		</section>
	);
};

export default DealsPage;
