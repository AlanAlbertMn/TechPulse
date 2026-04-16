'use client';
import { MinusCircleIcon, PlusCircleIcon, Trash } from 'lucide-react';
import { useCart } from '@/lib/CartProvider';
import Image from 'next/image';
import { CartProps } from '@/types/Product';

const CartDrawer = () => {
	const { cart, setCart } = useCart();

	// const [cart, setCart] = useState(cartContext);

	const handleProductAdd = (item: CartProps) => {
		setCart(
			cart.map((ci) =>
				ci.product.asin == item.product.asin
					? { ...item, quantity: item.quantity + 1 }
					: ci,
			),
		);
	};

	const handleProductDelete = (item: CartProps) => {
		setCart((prevCart) => {
			if (item.quantity == 1) {
				return prevCart.filter((ci) => ci.product.asin != item.product.asin);
			} else {
				return prevCart.map((ci) => {
					if (ci.product.asin == item.product.asin) {
						return { ...ci, quantity: ci.quantity - 1 };
					} else return ci;
				});
			}
		});
	};

	return (
		<div className='right-0 top-0 h-full w-xl mx-auto bg-slate-900 py-6 flex flex-col items-center'>
			{cart.length === 0 && <h3 className='text-center text-4xl'>No items</h3>}

			{cart.map((item, i) => (
				<div key={i} className='my-4 flex flex-col items-center'>
					<Image
						className='rounded-xl'
						src={item.product.product_photo}
						alt={item.product.product_title}
						width={300}
						height={300}
					/>
					<p className='text-center'>{`${item.product.product_title.split(' ').slice(0, 6).join(' ')}...`}</p>
					<p className='text-sm text-slate-400'>{item.product.product_price}</p>
					<div className='flex gap-4 border-amber-300 border-2 rounded-2xl px-5 py-2'>
						{item.quantity == 1 ? (
							<button>
								<Trash
									className='cursor-pointer'
									onClick={() => handleProductDelete(item)}
								/>
							</button>
						) : (
							<button>
								<MinusCircleIcon
									className='cursor-pointer'
									onClick={() => handleProductDelete(item)}
								/>
							</button>
						)}
						<p className=''>{item.quantity}</p>

						<button>
							<PlusCircleIcon
								className='cursor-pointer'
								onClick={() => handleProductAdd(item)}
							/>
						</button>
					</div>
				</div>
			))}
			{cart.length !== 0 && (
				<>
					<p className='pt-6 text-center text-3xl'>
						Total: $
						{cart
							.reduce(
								(cartTotal, currProd) =>
									cartTotal +
									Number(currProd.product.product_price!.replaceAll('$', '')) *
										currProd.quantity,
								0,
							)
							.toFixed(2)}
					</p>
					<button className='mt-6 w-2/3 bg-blue-500 py-3 rounded-xl cursor-pointer'>
						Checkout
					</button>
					<button
						className='w-2/3 bg-red-800 rounded-xl py-2 mt-6 cursor-pointer'
						onClick={() => setCart([])}
					>
						Clear cart
					</button>
				</>
			)}
		</div>
	);
};

export default CartDrawer;
