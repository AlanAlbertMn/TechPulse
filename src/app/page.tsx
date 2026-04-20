import ProductsGrid from '@/components/ProductsGrid';

export default async function Ecommerce() {
	return (
		<div className='bg-[#F8FAFC] text-slate-950/50 dark:bg-slate-950/70 dark:text-slate-200 min-h-screen'>
			{/* HERO */}
			<section className='pt-64 mb-10 text-center px-6'>
				<h1 className='text-5xl font-bold mb-6 text-slate-600 dark:text-slate-200'>
					Discover the Future of Tech
				</h1>

				<p className='text-slate-500 dark:text-slate-300 mb-8'>
					Latest gadgets curated for you
				</p>

				<button className='px-6 py-3 rounded-2xl text-white bg-[#2563EB] hover:bg-[#1a4196]'>
					Browse Deals
				</button>
			</section>

			{/* PRODUCTS */}
			<section className='max-w-7xl mx-auto py-16'>
				<h2 className='text-3xl my-10 text-[#013f6b] dark:text-slate-50'>
					Trending Products
				</h2>
				<div className='grid md:grid-cols-4 gap-6'>
					<ProductsGrid />
				</div>
			</section>

			{/* FOOTER */}
			<footer className='text-center text-slate-500 py-10 border-t border-slate-800'>
				© 2026 TechStore
			</footer>
		</div>
	);
}
