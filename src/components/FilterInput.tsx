'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type SortOption =
	| 'featured'
	| 'price-asc'
	| 'price-desc'
	| 'rating-desc'
	| 'name-asc';

const FilterInput = () => {
	const [sortBy, setSortBy] = useState<SortOption>('featured');
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const handleChange = (
		event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
	) => {
		setSortBy(event.target.value as SortOption);
		const params = new URLSearchParams(searchParams);
		params.set('sort', event.target.value);
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<select
			value={sortBy}
			onChange={handleChange}
			className='rounded-xl border border-slate-800 bg-slate-900 px-4 h-12 text-sm text-slate-200 outline-none hover:border-cyan-500/40'
		>
			<option value='featured'>Featured</option>
			<option value='price-asc'>Price: Low to High</option>
			<option value='price-desc'>Price: High to Low</option>
			<option value='rating-desc'>Highest Rated</option>
			<option value='name-asc'>Name: A-Z</option>
		</select>
	);
};

export default FilterInput;
