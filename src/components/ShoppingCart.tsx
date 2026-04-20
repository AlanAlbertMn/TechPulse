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
				<span className='absolute flex size-3'>
					<span className='absolute left-5.5 inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
					<span className='absolute left-5.5 inline-flex size-3 rounded-full bg-sky-500'></span>
				</span>
			)}
			<ShoppingCartIcon className='cursor-pointer' size={30} />
		</button>
	);
}
