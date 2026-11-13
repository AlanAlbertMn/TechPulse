'use client';

import { motion } from 'motion/react';
import SiteFooter from '@/components/home/SiteFooter';
import { stagger } from '@/lib/motion';
import { cn } from '@/lib/utils';

const pageStagger = stagger(0.05);

type PageShellProps = {
	children: React.ReactNode;
	/** Which corner the cyan bloom sits in */
	bloom?: 'left' | 'right';
	/** Full-bleed content above the padded container, e.g. a Ticker */
	banner?: React.ReactNode;
};

// Atmosphere (blueprint grid + bloom), padded container with the page-load
// stagger, and the footer. Children using the `rise` variant reveal in order.
export default function PageShell({
	children,
	bloom = 'right',
	banner,
}: PageShellProps) {
	return (
		<>
			{/* overflow-x-clip (not hidden) so sticky children keep working */}
			<main className='relative isolate overflow-x-clip'>
				<div aria-hidden className='absolute inset-0 -z-10 h-[36rem] bg-blueprint' />
				<div
					aria-hidden
					className={cn(
						'absolute -top-64 -z-10 size-[44rem] rounded-full bg-[radial-gradient(circle,var(--signal-bloom),transparent_65%)]',
						bloom === 'right' ? '-right-48' : '-left-48',
					)}
				/>
				{banner}
				<motion.div
					initial='hidden'
					animate='show'
					variants={pageStagger}
					className='mx-auto max-w-[1400px] px-6 pt-8 pb-24 md:px-12'
				>
					{children}
				</motion.div>
			</main>
			<SiteFooter />
		</>
	);
}
