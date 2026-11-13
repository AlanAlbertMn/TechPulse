'use client';

import { LightningIcon } from '@phosphor-icons/react';
import { Product } from '@prisma/client';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BuyNowButtonProps = {
	product: Product;
	quantity?: number;
	className?: string;
};

const BuyNowButton = ({ product, quantity = 1, className }: BuyNowButtonProps) => {
	const handlePay = async () => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			// The server reads the user from the session cookie and the price from the DB
			body: JSON.stringify({ cart: [{ product: { id: product.id }, quantity }] }),
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
		<Button
			variant='outline'
			onClick={handlePay}
			className={cn(
				'h-10 w-full gap-2 font-extrabold tracking-wide uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent',
				className,
			)}
		>
			<LightningIcon weight='fill' /> Buy now
		</Button>
	);
};

export default BuyNowButton;
