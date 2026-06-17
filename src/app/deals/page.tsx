import FilterInput from '@/components/FilterInput';
import ProductsGrid from '@/components/ProductsGrid';

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
			<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
				<ProductsGrid sortBy={sort} />
			</div>
		</section>
	);
};

export default DealsPage;
