'use client';
import Link from 'next/link';
import { ShoppingCartSimpleIcon } from '@phosphor-icons/react';
import { useCart } from '@/lib/CartProvider';
import { Button } from '@/components/ui/button';

export default function ShoppingCart() {
	// The cart is loaded from / saved to localStorage in CartProvider
	const { cart } = useCart();
	const totalItems = cart.reduce(
		(total, currItem) => total + currItem.quantity,
		0,
	);

	return (
		<Button
			variant='outline'
			size='icon-lg'
			nativeButton={false}
			render={<Link href='/cart' />}
			aria-label={`Shopping cart, ${totalItems} items`}
			className='relative size-10 rounded-full bg-transparent hover:border-muted-foreground dark:bg-transparent'
		>
			<ShoppingCartSimpleIcon className='size-5' />
			{totalItems > 0 && (
				<span className='absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-signal font-mono text-[10px] font-extrabold text-signal-foreground'>
					{totalItems}
				</span>
			)}
		</Button>
	);
}
