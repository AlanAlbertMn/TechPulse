'use client';
import { MinusCircleIcon, PlusCircleIcon, Trash } from 'lucide-react';
import { useCart } from '@/lib/CartProvider';
import Image from 'next/image';
import { CartProps } from '@/types/Product';
import { redirect } from 'next/navigation';
import { getUserFromSession } from '../api/auth/core/session';
import { sessionSchema } from '@/types/User';
import { useEffect, useState } from 'react';

const CartDrawer = () => {
	const [userId, setUserId] = useState<number>();
	const { cart, setCart } = useCart();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = (await getUserFromSession()) as sessionSchema;
				if (response) {
					setUserId(response.userId);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const handlePay = async () => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify({ cart, userId }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log(res);

		const session = await res.json();

		redirect(session.url);
	};

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
		<section className='right-0 top-0 h-full w-2/3 mt-12 mx-auto py-6 flex flex-col items-center'>
			{cart.length === 0 && <h3 className='text-center text-4xl'>No items</h3>}

			{cart.map((item, i) => (
				<div
					key={i}
					className='py-10 w-2/3 flex gap-12 border-b border-slate-600'
				>
					<Image
						className='max-h-72 max-w-48 object-scale-down'
						src={item.product.product_photo}
						alt={item.product.product_title}
						width={350}
						height={350}
					/>
					<div className='flex flex-col justify-evenly'>
						<p className='text-xl'>
							{`${item.product.product_title.substring(0, 75)}...`}
						</p>
						<p className='text-md text-slate-500 font-bold'>
							{item.product.product_price}
						</p>
						<div className='flex gap-4 w-32 border-amber-300 border-2 rounded-2xl px-5 py-2'>
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
					<button
						className='mt-6 w-2/3 bg-blue-500 text-white py-3 rounded-xl cursor-pointer'
						onClick={() => handlePay()}
					>
						Checkout
					</button>
				</>
			)}
		</section>
	);
};

export default CartDrawer;
