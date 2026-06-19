import ProductsBrowser from '@/components/ProductsBrowser';
import { getProducts } from '@/lib/products';
import { getUserFromSession } from '@/app/api/auth/core/session';
import { sessionSchema } from '@/types/User';
import Link from 'next/link';

export default async function Ecommerce() {
	const products = await getProducts();
	const user = (await getUserFromSession()) as sessionSchema;

	return (
		<div className='w-full dark:bg-slate-950'>
			{/* HERO */}
			<section className='py-56 w-full text-center bg-slate-50 dark:bg-[#182534] px-6 outline-2 outline-zinc-200 dark:outline-[#253648]'>
				<h1 className='text-5xl font-bold tracking-tight text-slate-950 dark:text-white'>
					Discover the Future of{' '}
					<span className='bg-linear-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent'>
						Tech
					</span>
				</h1>

				<p className='text-slate-800 dark:text-slate-300 my-6'>
					Latest gadgets curated for you
				</p>

				<Link href='/deals'>
					<button className='px-6 py-3 rounded-2xl text-white bg-sky-600 hover:bg-sky-700'>
						Browse Deals
					</button>
				</Link>
			</section>
			<section className='min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 mb-5'>
				<section className='max-w-7xl mx-auto'>
					<ProductsBrowser products={products} user={user} />
				</section>
			</section>
			{/* FOOTER */}
			<footer className='text-center text-white py-10 bg-[#3d7aff] outline-2 outline-zinc-200 dark:outline-[#253648] flex justify-around h-10 items-center'>
				<p>© 2026 TechStore</p>
				<p>by Alan Albert</p>
			</footer>
		</div>
	);
}
