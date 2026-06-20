import ProductsBrowser from '@/components/ProductsBrowser';
import { getProducts } from '@/lib/products';
import { getUserFromSession } from '@/app/api/auth/core/session';
import { sessionSchema } from '@/types/User';
import ImageSlideshow from '@/components/ImageSlideshow';

export default async function Ecommerce() {
	const products = await getProducts();
	const user = (await getUserFromSession()) as sessionSchema;

	return (
		<div className='w-full dark:bg-slate-950'>
			{/* HERO */}
			<section className='px-4 py-8 sm:px-6 lg:px-8'>
				<ImageSlideshow />
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
