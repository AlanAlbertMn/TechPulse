'use client';
import { useCart } from '@/lib/CartProvider';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const SuccessPage = () => {
	const { setCart } = useCart();
	useEffect(() => {
		setCart([]);
	}, [setCart]);
	return (
		<div className='grid place-items-center place-content-center mt-60 bg-slate-50 text-slate-950 gap-5 w-2/5 py-9 rounded-xl mx-auto'>
			<div className='flex gap-3 items-center'>
				<CheckCircle2 color='green' size={60} />
				<h1 className='text-6xl text-slate-800 font-bold'>
					Purchase completed!
				</h1>
			</div>
			<div className='w-2/3 text-center'>
				<p>
					Everything went good with your purchase! Feel free to keep browsing
					while we make sure your order is shipped.
				</p>
				<p className='font-bold'>
					{'You can find your order details inside your profile'}
				</p>
				<Link href='/'>
					<button className='bg-blue-600 hover:bg-blue-800 text-white cursor-pointer py-2 px-4 mt-7 rounded-xl'>
						Go back to browsing
					</button>
				</Link>
			</div>
		</div>
	);
};

export default SuccessPage;
