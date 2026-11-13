'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { SortOption } from '@/types/Sort';
import SortPills from './SortPills';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: 'featured', label: 'Featured' },
	{ value: 'price-asc', label: 'Price ↑' },
	{ value: 'price-desc', label: 'Price ↓' },
	// Deals have no rating data, so there's no "Top rated" option
	{ value: 'name-asc', label: 'A–Z' },
];

const FilterInput = () => {
	const searchParams = useSearchParams();
	// Read the value from the URL so it survives reloads / shared links
	const sortBy = (searchParams.get('sort') ?? 'featured') as SortOption;
	const router = useRouter();
	const pathname = usePathname();

	const handleChange = (value: SortOption) => {
		const params = new URLSearchParams(searchParams);
		params.set('sort', value);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<SortPills
			ariaLabel='Sort deals'
			options={SORT_OPTIONS}
			value={sortBy}
			onValueChange={handleChange}
		/>
	);
};

export default FilterInput;
