'use client';

import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '@/lib/motion';

// Grid cell that rises into view once; the delay staggers across a 4-column row
export default function InViewItem({
	index,
	className,
	children,
}: {
	index: number;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{
				duration: 0.8,
				ease: EASE_OUT_EXPO,
				delay: (index % 4) * 0.08,
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
