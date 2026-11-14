'use client';
import { useCart } from '@/lib/CartProvider';
import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
	ArrowLeftIcon,
	CheckCircleIcon,
	CreditCardIcon,
	PackageIcon,
	ShoppingCartSimpleIcon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import PageShell from '@/components/layout/PageShell';
import PageHeader from '@/components/layout/PageHeader';
import StatusMessage from '@/components/layout/StatusMessage';
import { rise } from '@/lib/motion';

const STATUS_LINES = [
	{ icon: CreditCardIcon, text: 'Payment // processed by Stripe' },
	{ icon: ShoppingCartSimpleIcon, text: 'Cart // cleared' },
	{ icon: PackageIcon, text: 'Order // in your profile' },
];

const SuccessPage = () => {
	const { setCart } = useCart();
	useEffect(() => {
		setCart([]);
	}, [setCart]);
	return (
		<PageShell>
			<PageHeader
				crumb='Order confirmed'
				title={['ORDER', 'PLACED.']}
				aside={
					<motion.ul
						variants={rise}
						className='flex flex-col gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase'
					>
						{STATUS_LINES.map(({ icon: Icon, text }) => (
							<li key={text} className='flex items-center gap-3'>
								<Icon className='text-signal' />
								{text}
							</li>
						))}
					</motion.ul>
				}
			/>

			<StatusMessage
				highlight
				icon={<CheckCircleIcon weight='fill' />}
				title='Purchase completed!'
				description='Everything went well with your purchase. Feel free to keep browsing while we make sure your order is shipped. You can find your order details inside your profile.'
			>
				<Button
					nativeButton={false}
					render={<Link href='/userOrders' />}
					className='h-12 gap-2 bg-signal px-6 text-sm font-extrabold tracking-wide text-signal-foreground uppercase shadow-[0_0_40px_-10px_var(--signal-glow)] hover:bg-signal/90'
				>
					<PackageIcon weight='bold' /> View my orders
				</Button>
				<Button
					variant='outline'
					nativeButton={false}
					render={<Link href='/' />}
					className='h-12 gap-2 px-6 text-sm font-extrabold tracking-wide uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent'
				>
					<ArrowLeftIcon weight='bold' /> Go back to browsing
				</Button>
			</StatusMessage>
		</PageShell>
	);
};

export default SuccessPage;
