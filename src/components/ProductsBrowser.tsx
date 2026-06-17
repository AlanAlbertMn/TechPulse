'use client';

import { useMemo, useState } from 'react';
import { Product } from '@prisma/client';
import ProductCard from './ProductCard';
import { sessionSchema } from '@/types/User';
import { SortOption } from '@/types/Sort';

type ProductsBrowserProps = {
	products: Product[];
	user: sessionSchema;
};

export default function ProductsBrowser({
	products,
	user,
}: ProductsBrowserProps) {
	const [sortBy, setSortBy] = useState<SortOption>('featured');
	const [filteredProducts, setFilteredProducts] = useState(products);

	const debounce = (onChange: React.ChangeEvent<HTMLInputElement>) => {
		let timeout: ReturnType<typeof setTimeout>;
		return (e) => {
			const form = e.currentTarget.value;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				onChange(form);
			}, 1000);
		};
	};

	const handleSearch = async (value: string) => {
		console.log(value);
		try {
			const filtered = products.filter((product) =>
				product.title.toLowerCase().includes(value.toLowerCase()),
			);
			console.log(filtered);
			setFilteredProducts(filtered);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const sortedProducts = useMemo(() => {
		const copy = [...filteredProducts];

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
	}, [filteredProducts, sortBy]);

	return (
		<>
			<div className='flex justify-between items-center'>
				<h2 className='text-3xl text-[#013f6b] dark:text-slate-50 my-6 font-bold'>
					Trending Products
				</h2>
				<div className='flex items-center gap-2'>
					<input
						className='rounded-xl border border-slate-800 bg-slate-900 px-4 h-12 text-sm text-slate-200 outline-none hover:border-cyan-500/40'
						onChange={debounce((e) => handleSearch(e))}
						placeholder='Search for something...'
						type='text'
					/>
					<select
						className='rounded-xl border border-slate-800 bg-slate-900 px-4 h-12 text-sm text-slate-200 outline-none hover:border-cyan-500/40'
						onChange={(event) => setSortBy(event.target.value as SortOption)}
						spellCheck='false'
						value={sortBy}
					>
						<option value='featured'>Featured</option>
						<option value='price-asc'>Price: Low to High</option>
						<option value='price-desc'>Price: High to Low</option>
						<option value='rating-desc'>Highest Rated</option>
						<option value='name-asc'>Name: A-Z</option>
					</select>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
				{sortedProducts.map((product) => (
					<ProductCard key={product.id} product={product} user={user} />
				))}
			</div>
		</>
	);
}
