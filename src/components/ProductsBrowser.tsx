'use client';

import { useMemo, useState, useEffect } from 'react';
import type { Product } from '@prisma/client';
import ProductCard from './ProductCard';
import type { sessionSchema } from '@/types/User';
import type { SortOption } from '@/types/Sort';

type ProductsBrowserProps = {
	products: Product[];
	user: sessionSchema;
};

export default function ProductsBrowser({
	products,
	user,
}: ProductsBrowserProps) {
	const [sortBy, setSortBy] = useState<SortOption>('featured');
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(searchTerm);
		}, 500);

		return () => clearTimeout(timeout);
	}, [searchTerm]);

	const filteredAndSortedProducts = useMemo(() => {
		const filtered = products.filter((product) =>
			product.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
		);

		const copy = [...filtered];

		switch (sortBy) {
			case 'price-asc':
				return copy.sort((a, b) => a.price - b.price);

			case 'price-desc':
				return copy.sort((a, b) => b.price - a.price);

			case 'rating-desc':
				return copy.sort((a, b) => b.rating - a.rating);

			case 'name-asc':
				return copy.sort((a, b) => a.title.localeCompare(b.title));

			case 'featured':
			default:
				return copy;
		}
	}, [products, debouncedSearch, sortBy]);

	return (
		<>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<h2 className='my-6 text-3xl font-bold text-[#013f6b] dark:text-slate-50'>
					Trending Products
				</h2>

				<div className='flex flex-col gap-3 sm:flex-row'>
					<input
						value={searchTerm}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setSearchTerm(event.target.value)
						}
						placeholder='Search in TechPulse'
						type='text'
						className='rounded-xl border border-slate-400 dark:border-slate-800 dark:bg-slate-900 px-4 h-12 text-sm text-slate-600 dark:text-slate-200 outline-none hover:border-amber-500'
					/>

					<select
						value={sortBy}
						onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
							setSortBy(event.target.value as SortOption)
						}
						spellCheck='false'
						className='rounded-xl border border-slate-400 dark:border-slate-800 dark:bg-slate-900 px-4 h-12 text-sm text-slate-600 dark:text-slate-200 outline-none hover:border-amber-500'
					>
						<option value='featured'>Featured</option>
						<option value='price-asc'>Price: Low to High</option>
						<option value='price-desc'>Price: High to Low</option>
						<option value='rating-desc'>Highest Rated</option>
						<option value='name-asc'>Name: A-Z</option>
					</select>
				</div>
			</div>

			{filteredAndSortedProducts.length === 0 ? (
				<div className='rounded-3xl border bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-900 p-10 text-center'>
					<p className='text-lg font-semibold dark:text-slate-100'>
						{`No products including '${searchTerm}'`}
					</p>

					<p className='mt-2 text-sm text-slate-400'>
						Try another search term.
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
					{filteredAndSortedProducts.map((product) => (
						<ProductCard key={product.id} product={product} user={user} />
					))}
				</div>
			)}
		</>
	);
}
