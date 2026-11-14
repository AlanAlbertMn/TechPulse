'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { CaretRightIcon } from '@phosphor-icons/react';
import { rise } from '@/lib/motion';

type PageHeaderProps = {
	/** Last breadcrumb segment, after "Catalog" */
	crumb: string;
	/** Two-line display headline; the second line is muted */
	title: [string, string];
	/** Right-hand slot: counts, stats */
	aside?: React.ReactNode;
};

// Breadcrumb + oversized two-line headline. Use inside PageShell.
export default function PageHeader({ crumb, title, aside }: PageHeaderProps) {
	return (
		<>
			<motion.nav
				variants={rise}
				aria-label='Breadcrumb'
				className='mb-8 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase lg:mb-12'
			>
				<Link href='/' className='transition-colors hover:text-foreground'>
					Catalog
				</Link>
				<CaretRightIcon className='text-border' />
				<span className='text-signal'>{crumb}</span>
			</motion.nav>

			<motion.header
				variants={rise}
				className='mb-12 flex flex-col gap-10 border-b pb-10 lg:mb-16 lg:flex-row lg:items-end lg:justify-between'
			>
				<h1 className='font-display text-7xl leading-[0.85] font-black tracking-tighter lg:text-9xl'>
					{title[0]}
					<br />
					<span className='text-muted-foreground'>{title[1]}</span>
				</h1>
				{aside}
			</motion.header>
		</>
	);
}
