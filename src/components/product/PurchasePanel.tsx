'use client';

import { useState } from 'react';
import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import type { Product } from '@prisma/client';
import AddToCartButton from '@/components/AddToCartButton';
import BuyNowButton from '@/components/BuyNowButton';
import { Button } from '@/components/ui/button';

const MAX_QTY = 10;

export default function PurchasePanel({
	product,
	signedIn,
}: {
	product: Product;
	signedIn: boolean;
}) {
	const [quantity, setQuantity] = useState(1);

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-col gap-3 sm:flex-row'>
				<div
					role='group'
					aria-label='Quantity'
					className='flex h-14 items-center justify-between rounded-lg border bg-muted/40 px-2 sm:w-36'
				>
					<Button
						variant='ghost'
						size='icon'
						aria-label='Decrease quantity'
						disabled={quantity <= 1}
						onClick={() => setQuantity((q) => Math.max(1, q - 1))}
					>
						<MinusIcon />
					</Button>
					<output aria-live='polite' className='font-mono text-lg'>
						{quantity}
					</output>
					<Button
						variant='ghost'
						size='icon'
						aria-label='Increase quantity'
						disabled={quantity >= MAX_QTY}
						onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
					>
						<PlusIcon />
					</Button>
				</div>
				<AddToCartButton
					product={product}
					quantity={quantity}
					className='h-14 flex-1 text-base shadow-[0_0_30px_-10px_var(--signal-glow)]'
				/>
			</div>
			{signedIn && (
				<BuyNowButton product={product} quantity={quantity} className='h-14' />
			)}
		</div>
	);
}
