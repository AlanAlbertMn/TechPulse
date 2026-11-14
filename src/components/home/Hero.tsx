import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { ArrowRightIcon, StarIcon } from '@phosphor-icons/react/ssr';
import type { Product } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// One orchestrated page-load reveal: children rise in sequence.
const container = {
	hidden: {},
	show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const rise = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

type HeroProps = {
	productCount: number;
	topProduct: Product | null;
};

export default function Hero({ productCount, topProduct }: HeroProps) {
	return (
		<motion.section
			initial='hidden'
			animate='show'
			variants={container}
			className='relative isolate flex min-h-[85dvh] flex-col overflow-hidden border-b md:flex-row'
		>
			{/* Atmosphere: blueprint grid + cyan bloom */}
			<div aria-hidden className='absolute inset-0 -z-10 bg-blueprint' />
			<div
				aria-hidden
				className='absolute -top-40 -left-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,var(--signal-bloom),transparent_65%)]'
			/>

			{/* Left: type + actions */}
			<div className='relative z-10 flex w-full flex-col justify-center border-border/50 px-6 py-20 md:w-[45%] md:border-r md:px-16'>
				<motion.div
					variants={rise}
					className='mb-8 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/50 px-3 py-1'
				>
					<span className='size-1.5 rounded-full bg-signal animate-signal-pulse' />
					<span className='font-mono text-xs tracking-widest text-muted-foreground uppercase'>
						Catalog live · {productCount} devices
					</span>
				</motion.div>

				<motion.h1
					variants={rise}
					className='mb-8 font-display text-[13vw] leading-[0.85] font-black tracking-tighter sm:text-7xl lg:text-9xl'
				>
					FORGE
					<br />
					<span className='text-muted-foreground'>THE</span> FUTURE.
				</motion.h1>

				<motion.p
					variants={rise}
					className='mb-10 max-w-md text-xl leading-relaxed font-extralight text-muted-foreground md:text-2xl'
				>
					Industrial-grade hardware engineered for extreme workloads. No
					compromises. Pure throughput.
				</motion.p>

				<motion.div variants={rise} className='flex flex-wrap items-center gap-6'>
					<Button
						nativeButton={false}
						render={<Link href='#catalog' />}
						className='h-14 gap-2 rounded-none px-8 text-sm font-extrabold tracking-wide uppercase transition-colors duration-300 hover:bg-signal hover:text-signal-foreground'
					>
						Explore catalog
						<ArrowRightIcon weight='bold' />
					</Button>
					<div className='flex flex-col font-mono text-xs text-muted-foreground'>
						<span>SYS.ON // ONLINE</span>
						<Link href='/deals' className='transition-colors hover:text-signal'>
							DEALS.EXE →
						</Link>
					</div>
				</motion.div>
			</div>

			{/* Right: immersive image */}
			<motion.div
				variants={{
					hidden: { opacity: 0, scale: 1.04 },
					show: {
						opacity: 1,
						scale: 1,
						transition: { duration: 1.4, ease: EASE_OUT_EXPO },
					},
				}}
				className='group relative min-h-[50dvh] w-full overflow-hidden bg-muted/20 md:min-h-0 md:w-[55%]'
			>
				<Image
					src='/images/hero-rig.jpg'
					alt='Sleek aluminum laptop setup in a dark room'
					fill
					priority
					sizes='(max-width: 768px) 100vw, 55vw'
					className='object-cover grayscale-30 contrast-125 transition-transform duration-[10s] ease-out group-hover:scale-105'
				/>
				<div className='absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent' />
				<div className='absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-transparent' />

				{topProduct && (
					<motion.div
						variants={rise}
						className='absolute right-6 bottom-6 left-6 z-20 sm:left-auto md:right-8 md:bottom-8'
					>
						<Card className='gap-1 rounded-xl bg-popover/60 px-5 py-4 ring-sidebar-border backdrop-blur-xl sm:max-w-xs'>
							<Link
								href={`/products/${topProduct.asin}`}
								className='group/hud flex flex-col gap-1'
							>
								<span className='flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase'>
									<StarIcon weight='fill' className='text-signal' />
									Top rated · {topProduct.rating.toFixed(1)}
								</span>
								<span className='line-clamp-1 font-display text-lg font-black transition-colors group-hover/hud:text-signal'>
									{topProduct.title}
								</span>
								<span className='font-mono text-sm text-muted-foreground'>
									${topProduct.price.toFixed(2)}
								</span>
							</Link>
						</Card>
					</motion.div>
				)}
			</motion.div>
		</motion.section>
	);
}
