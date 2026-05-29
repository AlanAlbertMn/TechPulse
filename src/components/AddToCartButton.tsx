'use client';
import { useCart } from '@/lib/CartProvider';
import { CartProps } from '@/types/Product';
import { Product } from '@prisma/client';
import { ShoppingCart } from 'lucide-react';
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
		const titleArray = product.title.split(' ').slice(0, 10).join(' ');
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
			transition: Bounce,
		});
	};

	return (
		<button
			onClick={() => handleAddCart()}
			className='w-full rounded-xl font-semibold hover:scale-[1.02] transition-all mb-2 text-white bg-[#2563EB] hover:bg-[#1a4196] h-10'
		>
			<span className='flex items-center gap-2 justify-center'>
				<ShoppingCart /> Add to cart
			</span>
		</button>
	);
}
