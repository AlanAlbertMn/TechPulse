'use client';

import { Product } from '@prisma/client';
import { toast } from 'react-toastify';

const BuyNowButton = ({ product }: { product: Product }) => {
	const handlePay = async () => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			// The server reads the user from the session cookie and the price from the DB
			body: JSON.stringify({ cart: [{ product: { id: product.id }, quantity: 1 }] }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		if (!res.ok || !data.url) {
			toast.error(data.error ?? 'Unable to start checkout', {
				position: 'bottom-right',
			});
			return;
		}
		// redirect() doesn't work in event handlers; Stripe is an external URL anyway
		window.location.assign(data.url);
	};

	return (
		<button
			onClick={() => handlePay()}
			className='w-full text-white transition-all font-medium bg-sky-700 hover:bg-sky-800 hover:scale-[1.02] rounded-xl h-10 mt-1'
		>
			Buy now
		</button>
	);
};

export default BuyNowButton;
