'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'motion/react';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	LightningIcon,
	LockKeyIcon,
	MinusIcon,
	PlusIcon,
	ShieldCheckIcon,
	ShoppingCartSimpleIcon,
	TrashIcon,
} from '@phosphor-icons/react';
import { useCart } from '@/lib/CartProvider';
import { CartProps } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { discountPercent } from '@/lib/productText';
import PageShell from '@/components/layout/PageShell';
import PageHeader from '@/components/layout/PageHeader';
import StatusMessage from '@/components/layout/StatusMessage';
import SpecimenPlate from '@/components/SpecimenPlate';
import { EASE_OUT_EXPO, rise } from '@/lib/motion';

const money = (n: number) => `$${n.toFixed(2)}`;

const CartDrawer = () => {
	const { cart, setCart, hydrated } = useCart();
	const router = useRouter();
	// UI-only: shows a spinner and blocks double clicks while checkout starts
	const [paying, setPaying] = useState(false);

	const handlePay = async () => {
		// Only ids + quantities are sent; the server looks up prices and the
		// logged-in user itself.
		const res = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify({
				cart: cart.map((item) => ({
					product: { id: item.product.id },
					quantity: item.quantity,
				})),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (res.status === 401) {
			toast.info('Account required', {
				description:
					'Please create an account first to keep track of your order. Or login if you already have an account.',
				duration: 5000,
			});
			router.push('/register');
			return;
		}

		const data = await res.json();
		if (!res.ok || !data.url) {
			toast.error(data.error ?? 'Unable to start checkout');
			return;
		}

		// redirect() doesn't work in event handlers; Stripe is an external URL
		window.location.assign(data.url);
	};

	const handleProductAdd = (item: CartProps) => {
		setCart((prevCart) =>
			prevCart.map((ci) =>
				ci.product.asin == item.product.asin
					? { ...ci, quantity: ci.quantity + 1 }
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

	const onCheckout = async () => {
		setPaying(true);
		try {
			await handlePay();
		} finally {
			setPaying(false);
		}
	};

	// Display figures. The total matches the original calculation; Stripe charges DB prices.
	const total = cart.reduce(
		(cartTotal, currProd) =>
			cartTotal + Number(currProd.product.price!) * currProd.quantity,
		0,
	);
	const units = cart.reduce((n, item) => n + item.quantity, 0);
	const savings = cart.reduce((sum, { product, quantity }) => {
		const original = product.original_price;
		return original && original > product.price
			? sum + (original - product.price) * quantity
			: sum;
	}, 0);

	const isEmpty = hydrated && cart.length === 0;

	return (
		<PageShell>
			<PageHeader
				crumb='Cart'
				title={['YOUR', 'CART.']}
				aside={
					<p className='font-mono text-xs tracking-widest text-muted-foreground uppercase'>
						{hydrated ? (
							<>
								<span className='text-foreground'>
									{String(units).padStart(2, '0')}
								</span>{' '}
								{units === 1 ? 'unit' : 'units'} {'//'} {cart.length}{' '}
								{cart.length === 1 ? 'product' : 'products'}
							</>
						) : (
							'Loading cart…'
						)}
					</p>
				}
			/>

					{!hydrated && (
						<div className='grid gap-8 lg:grid-cols-[1fr_400px]'>
							<div className='flex flex-col gap-4'>
								<Skeleton className='h-44 rounded-xl' />
								<Skeleton className='h-44 rounded-xl' />
							</div>
							<Skeleton className='h-96 rounded-xl' />
						</div>
					)}

					{isEmpty && <EmptyCart />}

					{hydrated && cart.length > 0 && (
						<div className='grid items-start gap-8 lg:grid-cols-[1fr_400px] xl:gap-12'>
							{/* Line items */}
							<motion.ul variants={rise} className='flex flex-col gap-4'>
								<AnimatePresence initial={false} mode='popLayout'>
									{cart.map((item, index) => (
										<motion.li
											key={item.product.asin}
											layout
											exit={{
												opacity: 0,
												x: -40,
												transition: { duration: 0.35, ease: EASE_OUT_EXPO },
											}}
										>
											<CartLine
												item={item}
												index={index}
												onAdd={() => handleProductAdd(item)}
												onRemove={() => handleProductDelete(item)}
											/>
										</motion.li>
									))}
								</AnimatePresence>
							</motion.ul>

							{/* Summary */}
							<motion.aside variants={rise} className='lg:sticky lg:top-8'>
								<Card className='relative overflow-hidden rounded-xl'>
									<div
										aria-hidden
										className='absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle,var(--signal-bloom),transparent_70%)]'
									/>
									<CardContent className='relative flex flex-col gap-6 p-6 lg:p-8'>
										<p className='font-mono text-xs tracking-widest text-signal uppercase'>
											Summary {'//'} Order
										</p>

										<dl className='flex flex-col gap-3 font-mono text-sm'>
											<div className='flex justify-between text-muted-foreground'>
												<dt>Subtotal · {units} {units === 1 ? 'unit' : 'units'}</dt>
												<dd className='text-foreground'>{money(total + savings)}</dd>
											</div>
											{savings > 0 && (
												<div className='flex justify-between text-muted-foreground'>
													<dt>You save</dt>
													<dd className='text-signal'>−{money(savings)}</dd>
												</div>
											)}
										</dl>

										<Separator />

										<div>
											<p className='mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase'>
												Total
											</p>
											<p className='font-mono text-6xl leading-none font-extralight tracking-tighter'>
												{money(total)}
											</p>
											<p className='mt-3 text-sm font-extralight text-muted-foreground'>
												Final amount is confirmed on Stripe before you pay.
											</p>
										</div>

										<Button
											onClick={onCheckout}
											disabled={paying}
											className='group/checkout h-14 w-full gap-2 bg-signal text-base font-extrabold tracking-wide text-signal-foreground uppercase shadow-[0_0_40px_-10px_var(--signal-glow)] hover:bg-signal/90'
										>
											{paying ? (
												<>
													<Spinner /> Opening checkout
												</>
											) : (
												<>
													<LockKeyIcon weight='bold' /> Checkout
													<ArrowRightIcon
														weight='bold'
														className='transition-transform duration-300 ease-out-expo group-hover/checkout:translate-x-1'
													/>
												</>
											)}
										</Button>

										<Button
											variant='outline'
											nativeButton={false}
											render={<Link href='/' />}
											className='h-12 w-full gap-2 text-sm font-extrabold tracking-wide uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent'
										>
											<ArrowLeftIcon weight='bold' /> Keep shopping
										</Button>

										<ul className='flex flex-col gap-2 border-t pt-6 font-mono text-[11px] tracking-widest text-muted-foreground uppercase'>
											<li className='flex items-center gap-3'>
												<ShieldCheckIcon className='size-4 text-signal' />
												Payment // handled by Stripe
											</li>
											<li className='flex items-center gap-3'>
												<LightningIcon className='size-4 text-signal' />
												Prices // verified at checkout
											</li>
										</ul>
									</CardContent>
								</Card>
							</motion.aside>
						</div>
					)}
		</PageShell>
	);
};

function CartLine({
	item,
	index,
	onAdd,
	onRemove,
}: {
	item: CartProps;
	index: number;
	onAdd: () => void;
	onRemove: () => void;
}) {
	const { product, quantity } = item;
	const href = `/products/${product.asin}`;
	const discount = discountPercent(product.price, product.original_price);

	return (
		<Card className='group/line flex-row gap-0 rounded-xl p-0 transition-colors hover:ring-foreground/20'>
			<Link href={href} tabIndex={-1} aria-hidden className='shrink-0 p-3'>
				<SpecimenPlate
					src={product.thumbnail}
					alt=''
					sizes='160px'
					className='size-28 rounded-lg sm:size-40'
					imageClassName='transition-transform duration-700 ease-out-expo group-hover/line:scale-105'
				/>
			</Link>

			<div className='flex min-w-0 flex-1 flex-col justify-between gap-4 py-4 pr-4 sm:py-5 sm:pr-6'>
				<div className='flex items-start justify-between gap-4'>
					<div className='min-w-0'>
						<p className='mb-1 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase'>
							<span className='text-signal'>{String(index + 1).padStart(2, '0')}</span>
							{product.brand ?? 'Hardware'}
						</p>
						<Link
							href={href}
							title={product.title}
							className='line-clamp-2 font-display text-lg leading-tight font-black tracking-tight transition-colors hover:text-signal sm:text-xl'
						>
							{product.title}
						</Link>
					</div>
					{discount && (
						<Badge className='hidden shrink-0 rounded-sm bg-signal font-mono font-extrabold text-signal-foreground sm:inline-flex'>
							−{discount}%
						</Badge>
					)}
				</div>

				<div className='flex flex-wrap items-end justify-between gap-3'>
					<div
						role='group'
						aria-label={`Quantity of ${product.title}`}
						className='flex h-11 items-center gap-1 rounded-lg border bg-muted/40 px-1'
					>
						<Button
							variant='ghost'
							size='icon-sm'
							aria-label={quantity === 1 ? 'Remove from cart' : 'Decrease quantity'}
							onClick={onRemove}
							className={quantity === 1 ? 'hover:text-destructive' : undefined}
						>
							{quantity === 1 ? <TrashIcon /> : <MinusIcon />}
						</Button>
						<output aria-live='polite' className='w-8 text-center font-mono'>
							{quantity}
						</output>
						<Button
							variant='ghost'
							size='icon-sm'
							aria-label='Increase quantity'
							onClick={onAdd}
						>
							<PlusIcon />
						</Button>
					</div>

					<div className='sm:text-right'>
						<p className='font-mono text-[11px] text-muted-foreground'>
							{quantity} × {money(product.price)}
							{product.original_price && product.original_price > product.price && (
								<span className='ml-2 line-through'>{money(product.original_price)}</span>
							)}
						</p>
						<p className='font-mono text-2xl font-extralight tracking-tight sm:text-3xl'>
							{money(product.price * quantity)}
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
}

function EmptyCart() {
	return (
		<StatusMessage
			icon={<ShoppingCartSimpleIcon weight='thin' />}
			title='Nothing in here yet.'
			description='Your cart is empty. Find something worth plugging in.'
		>
			<Button
				nativeButton={false}
				render={<Link href='/' />}
				className='h-12 gap-2 px-6 text-sm font-extrabold tracking-wide uppercase hover:bg-signal hover:text-signal-foreground'
			>
				Browse catalog <ArrowRightIcon weight='bold' />
			</Button>
			<Button
				variant='outline'
				nativeButton={false}
				render={<Link href='/deals' />}
				className='h-12 gap-2 px-6 text-sm font-extrabold tracking-wide uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent'
			>
				<LightningIcon weight='bold' /> See deals
			</Button>
		</StatusMessage>
	);
}

export default CartDrawer;
