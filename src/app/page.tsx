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
			<section className='py-32 w-full text-center dark:bg-[#182534] px-6 outline-2 outline-zinc-200 dark:outline-[#253648]'>
				<h1 className='text-5xl font-bold mb-6 text-[#3d7aff] dark:text-slate-200'>
					Discover the Future of Tech
				</h1>

				<p className='text-slate-500 dark:text-slate-300 mb-8'>
					Latest gadgets curated for you
				</p>

				<Link href='/deals'>
					<button className='px-6 py-3 rounded-2xl text-white bg-[#2563EB] hover:bg-[#1a4196]'>
						Browse Deals
					</button>
				</Link>
			</section>
			<section className='min-h-screen my-10 mx-auto w-3/4'>
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
