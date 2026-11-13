'use client';

import { useMemo, useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import type { Product } from '@prisma/client';
import ProductCard from './ProductCard';
import type { sessionSchema } from '@/types/User';
import type { SortOption } from '@/types/Sort';
import { Input } from '@/components/ui/input';
import SortPills from './SortPills';
import InViewItem from './InViewItem';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ProductsBrowserProps = {
	products: Product[];
	user: sessionSchema;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: 'featured', label: 'Featured' },
	{ value: 'rating-desc', label: 'Top rated' },
	{ value: 'price-asc', label: 'Price ↑' },
	{ value: 'price-desc', label: 'Price ↓' },
	{ value: 'name-asc', label: 'A–Z' },
];

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

	// The lead card only makes sense on the default, unfiltered view
	const showFeatured = sortBy === 'featured' && !debouncedSearch;

	return (
		<section id='catalog' className='scroll-mt-4'>
			{/* Sticky utility bar */}
			<div className='sticky top-0 z-40 flex flex-col items-start justify-between gap-4 border-b bg-background/80 px-6 py-4 backdrop-blur-xl md:flex-row md:items-center md:px-12'>
				<SortPills
					ariaLabel='Sort products'
					options={SORT_OPTIONS}
					value={sortBy}
					onValueChange={setSortBy}
				/>

				<div className='flex w-full items-center justify-between gap-4 md:w-auto md:justify-end'>
					<span className='font-mono text-xs whitespace-nowrap text-muted-foreground'>
						{filteredAndSortedProducts.length} ITEMS
					</span>
					<div className='relative w-full md:w-72'>
						<MagnifyingGlassIcon className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
						<Input
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder='Search the catalog'
							aria-label='Search products'
							type='search'
							className='h-9 rounded-full pl-9'
						/>
					</div>
				</div>
			</div>

			<div className='px-6 py-12 md:px-12'>
				<div className='mb-10 flex flex-col gap-3'>
					<span className='font-mono text-xs tracking-widest text-signal uppercase'>
						{debouncedSearch ? 'Query results' : '01 // Inventory'}
					</span>
					<h2 className='font-display text-5xl leading-none font-black tracking-tighter md:text-7xl'>
						{debouncedSearch ? (
							<>
								<span className='text-muted-foreground'>“</span>
								{debouncedSearch}
								<span className='text-muted-foreground'>”</span>
							</>
						) : (
							'The catalog.'
						)}
					</h2>
				</div>

				{filteredAndSortedProducts.length === 0 ? (
					<Card className='items-center gap-2 rounded-2xl border border-dashed py-16 text-center ring-0'>
						<p className='font-display text-2xl font-black'>
							No signal for “{searchTerm}”
						</p>
						<p className='font-extralight text-muted-foreground'>
							Try another search term.
						</p>
					</Card>
				) : (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{filteredAndSortedProducts.map((product, index) => {
							const featured = showFeatured && index === 0;
							return (
								<InViewItem
									key={product.id}
									index={index}
									className={cn(featured && 'sm:col-span-2')}
								>
									<ProductCard
										product={product}
										user={user}
										featured={featured}
									/>
								</InViewItem>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
