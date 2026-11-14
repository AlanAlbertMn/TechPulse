'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ProductGalleryProps = {
	title: string;
	images: string[];
};

export default function ProductGallery({ title, images }: ProductGalleryProps) {
	const [index, setIndex] = useState(0);
	const count = images.length;
	const go = (step: number) => setIndex((i) => (i + step + count) % count);

	return (
		<div className='flex flex-col gap-4'>
			{/* Specimen plate: multiply blend removes the white backdrop of product shots */}
			<div className='group relative aspect-square overflow-hidden rounded-2xl border bg-linear-to-br from-plate via-plate to-plate-edge'>
				<div
					aria-hidden
					className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--signal-bloom),transparent_60%)]'
				/>
				<AnimatePresence mode='wait' initial={false}>
					<motion.div
						key={images[index]}
						initial={{ opacity: 0, scale: 0.96 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.02 }}
						transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
						className='absolute inset-0'
					>
						<Image
							src={images[index]}
							alt={`${title}, image ${index + 1} of ${count}`}
							fill
							priority={index === 0}
							sizes='(max-width: 1024px) 100vw, 50vw'
							className='object-contain p-10 mix-blend-multiply transition-transform duration-700 ease-out-expo group-hover:scale-105 md:p-16'
						/>
					</motion.div>
				</AnimatePresence>

				<span className='absolute right-4 bottom-4 rounded-full bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur'>
					{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
				</span>
			</div>

			{count > 1 && (
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						size='icon'
						aria-label='Previous image'
						onClick={() => go(-1)}
						className='hidden shrink-0 rounded-full sm:inline-flex'
					>
						<CaretLeftIcon />
					</Button>

					<div className='flex flex-1 gap-3 overflow-x-auto p-1'>
						{images.map((src, i) => (
							<Button
								key={src}
								variant='outline'
								aria-label={`Show image ${i + 1}`}
								aria-current={i === index || undefined}
								onClick={() => setIndex(i)}
								className={cn(
									'relative size-20 shrink-0 overflow-hidden rounded-lg bg-plate p-0 hover:border-muted-foreground hover:bg-plate dark:bg-plate dark:hover:bg-plate',
									i === index && 'border-signal ring-1 ring-signal hover:border-signal',
								)}
							>
								<Image
									src={src}
									alt=''
									fill
									sizes='80px'
									className='object-contain p-2 mix-blend-multiply'
								/>
							</Button>
						))}
					</div>

					<Button
						variant='outline'
						size='icon'
						aria-label='Next image'
						onClick={() => go(1)}
						className='hidden shrink-0 rounded-full sm:inline-flex'
					>
						<CaretRightIcon />
					</Button>
				</div>
			)}
		</div>
	);
}
