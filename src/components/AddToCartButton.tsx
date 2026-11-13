'use client';
import { PlusIcon } from '@phosphor-icons/react';
import { Product } from '@prisma/client';
import { Bounce, toast } from 'react-toastify';
import { useCart } from '@/lib/CartProvider';
import { CartProps } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AddToCartButtonProps = {
	product: Product;
	quantity?: number;
	className?: string;
};

export default function AddToCartButton({
	product,
	quantity = 1,
	className,
}: AddToCartButtonProps) {
	const { cart, setCart } = useCart();

	const handleAddCart = () => {
		const titleArray = product.title.split(' ').slice(0, 10).join(' ');
		const existingProd = cart.find(
			(cartItem) => cartItem.product.asin == product.asin,
		);
		if (existingProd) {
			//item already in the cart
			const productToAdd: CartProps = {
				product: product,
				quantity: existingProd.quantity + quantity,
			};
			const newCart = cart.filter(
				(cartItem) => cartItem.product.asin != product.asin,
			);
			setCart([productToAdd, ...newCart]);
		} else {
			//item not on cart
			const productToAdd: CartProps = { product: product, quantity };
			setCart([productToAdd, ...cart]);
		}

		toast.success(`${titleArray}... has been added to the cart`, {
			position: 'bottom-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			transition: Bounce,
		});
	};

	return (
		<Button
			onClick={handleAddCart}
			className={cn(
				'h-10 w-full gap-2 font-extrabold tracking-wide uppercase transition-colors hover:bg-signal hover:text-signal-foreground',
				className,
			)}
		>
			<PlusIcon weight='bold' /> Add to cart
		</Button>
	);
}
