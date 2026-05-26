'use client';
import { useCart } from '@/lib/CartProvider';
import { CartProps, Product } from '@/types/Product';
import { useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';

export default function AddToCartButton({ product }: { product: Product }) {
	const { cart, setCart } = useCart();

	useEffect(() => {
		//TODO: fix re rendering on every component when cart changes
		//console.log(cart);
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const handleAddCart = () => {
		// total and quantities should be added here?
		const titleArray = product.product_title.split(' ').slice(0, 10).join(' ');
		const existingProd = cart.find(
			(cartItem) => cartItem.product.asin == product.asin,
		);
		if (existingProd) {
			//item already in the cart
			const productToAdd: CartProps = {
				product: product,
				quantity: existingProd.quantity + 1,
			};
			const newCart = cart.filter(
				(cartItem) => cartItem.product.asin != product.asin,
			);
			setCart([productToAdd, ...newCart]);
		} else {
			//item not on cart
			const productToAdd: CartProps = { product: product, quantity: 1 };
			setCart([productToAdd, ...cart]);
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		toast.success(`${titleArray}... has been added to the cart`, {
			position: 'bottom-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Bounce,
		});
	};

	return (
		<button
			onClick={() => handleAddCart()}
			className='w-full mb-2 text-white bg-[#2563EB] hover:bg-[#1a4196] rounded-4xl h-10'
		>
			Add to cart
		</button>
	);
}
