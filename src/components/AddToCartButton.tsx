'use client'
import { useCart } from '@/lib/CartProvider';
import { Product } from '@/types/Product';

export default function AddToCartButton ({product}: {product: Product}) {
	console.log(product);
	

    const {cart, setCart} = useCart();
	return (
		<button
			onClick={() => setCart([...cart, product])}
			className='w-full bg-cyan-600 py-2 rounded-xl hover:bg-cyan-800'
		>
			Add to cart
		</button>
	);
};
