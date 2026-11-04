'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { SortOption } from '@/types/Sort';

const FilterInput = () => {
	const searchParams = useSearchParams();
	// Read the value from the URL so it survives reloads / shared links
	const sortBy = (searchParams.get('sort') ?? 'featured') as SortOption;
	const router = useRouter();
	const pathname = usePathname();

	const handleChange = (
		event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
	) => {
		const params = new URLSearchParams(searchParams);
		params.set('sort', event.target.value);
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<select
			value={sortBy}
			onChange={handleChange}
			className='rounded-xl border border-slate-400 dark:border-slate-800 dark:bg-slate-900 px-4 h-12 text-sm text-slate-600 dark:text-slate-200 outline-none hover:border-amber-500'
		>
			<option value='featured'>Featured</option>
			<option value='price-asc'>Price: Low to High</option>
			<option value='price-desc'>Price: High to Low</option>
			{/* Deals have no rating data, so there's no "Highest Rated" option */}
			<option value='name-asc'>Name: A-Z</option>
		</select>
	);
};

export default FilterInput;
