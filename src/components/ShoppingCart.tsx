'use client';
import { useCart } from '@/lib/CartProvider';
import { ShoppingCartIcon } from 'lucide-react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function ShoppingCart() {
	const { cart, setCart } = useCart();

	useEffect(() => {
		// get cart from context for displaying it
		const localCart = localStorage.getItem('cart');
		if (localCart != null) setCart(JSON.parse(localCart));
	}, [setCart]);

	return (
		<button onClick={() => redirect('/cart')}>
			{cart.length != 0 && (
				<span className='cursor-pointer absolute flex size-4'>
					<p
						className={`cursor-pointer absolute left-full -translate-x-0.5 z-50 text-white text-xs font-bold`}
					>
						{cart.reduce(
							(totalItems, currItem) => totalItems + currItem.quantity,
							0,
						)}
					</p>
					<span className='cursor-pointer absolute left-2.5 inline-flex size-4 h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
					<span className='absolute left-2.5 inline-flex size-4 rounded-full bg-sky-500'></span>
				</span>
			)}
			<ShoppingCartIcon color='#3d7aff' className='cursor-pointer' size={30} />
		</button>
	);
}
