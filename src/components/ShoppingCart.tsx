'use client';
import { useCart } from '@/lib/CartProvider';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

export default function ShoppingCart() {
	// The cart is loaded from / saved to localStorage in CartProvider
	const { cart } = useCart();

	return (
		<Link href='/cart' aria-label='Shopping cart' className='relative'>
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
			<ShoppingCartIcon
				color='#2563EB'
				className='cursor-pointer size-7 md:size-8'
			/>
		</Link>
	);
}
