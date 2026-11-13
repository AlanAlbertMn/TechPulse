'use client';

import { motion } from 'motion/react';
import { EASE_OUT_EXPO, rise } from '@/lib/motion';
import { cn } from '@/lib/utils';

type StatusMessageProps = {
	/** Phosphor icon shown inside the orbit emblem */
	icon: React.ReactNode;
	title: string;
	description: string;
	/** Cyan icon with a pulsing ring, for confirmations */
	highlight?: boolean;
	/** Action buttons */
	children?: React.ReactNode;
};

// Orbit emblem + headline + actions: empty lists, confirmations
export default function StatusMessage({
	icon,
	title,
	description,
	highlight = false,
	children,
}: StatusMessageProps) {
	return (
		<motion.div
			variants={rise}
			className='flex flex-col items-center py-4 text-center lg:py-8'
		>
			<div aria-hidden className='relative mb-8 grid size-40 place-items-center'>
				<div className='absolute inset-0 animate-orbit rounded-full border border-dashed border-border motion-reduce:animate-none'>
					<span className='absolute top-1/2 -left-1 size-2 rounded-full bg-signal shadow-[0_0_12px_var(--signal-glow)]' />
				</div>
				{highlight && (
					<div className='absolute inset-8 animate-ping rounded-full border border-signal/40 [animation-duration:2.4s] motion-reduce:animate-none' />
				)}
				<div className='absolute inset-8 rounded-full border border-border/50 bg-[radial-gradient(circle,var(--signal-bloom),transparent_70%)]' />
				<motion.span
					initial={highlight ? { scale: 0, rotate: -45 } : false}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT_EXPO }}
					className={cn(
						'relative [&_svg]:size-14',
						highlight
							? 'text-signal drop-shadow-[0_0_20px_var(--signal-glow)]'
							: 'text-foreground',
					)}
				>
					{icon}
				</motion.span>
			</div>
			<h2 className='mb-4 font-display text-5xl leading-[0.9] font-black tracking-tighter md:text-6xl'>
				{title}
			</h2>
			<p className='mb-8 max-w-md text-lg font-extralight text-muted-foreground'>
				{description}
			</p>
			{children && <div className='flex flex-col gap-3 sm:flex-row'>{children}</div>}
		</motion.div>
	);
}
