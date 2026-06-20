// src/components/ImageSlideshow.tsx
'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function ImageSlideshow() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const goToNextSlide = () => {
		console.log(intervalRef.current);

		setCurrentIndex((prevIndex) =>
			prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const goToPreviousSlide = () => {
		console.log(intervalRef.current);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
		);
	};

	useEffect(() => {
		const id = setInterval(() => {
			goToNextSlide();
		}, 5000);
		intervalRef.current = id;

		return () => clearInterval(id);
	}, []);

	return (
		<section className='relative mx-auto mt-8 w-full max-w-7xl overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950 dark:shadow-cyan-500/5'>
			<Link href='/deals'>
				<div className='relative aspect-16/8 w-full overflow-hidden'>
					{slides.map((slide, index) => (
						<Image
							key={slide.id}
							src={slide.src}
							alt={slide.alt}
							fill
							priority={index === 0}
							className={`object-cover transition-all duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            `}
						/>
					))}

					<div className='absolute inset-0 bg-linear-to-r from-slate-950/20 via-transparent to-slate-950/20' />
				</div>
			</Link>

			<button
				type='button'
				onClick={goToPreviousSlide}
				aria-label='Previous slide'
				className='absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md transition-all hover:bg-cyan-500/80'
			>
				<ChevronLeft size={22} />
			</button>

			<button
				type='button'
				onClick={goToNextSlide}
				aria-label='Next slide'
				className='absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md transition-all hover:bg-cyan-500/80'
			>
				<ChevronRight size={22} />
			</button>

			<div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'>
				{slides.map((slide, index) => (
					<button
						key={slide.id}
						type='button'
						onClick={() => setCurrentIndex(index)}
						aria-label={`Go to slide ${index + 1}`}
						className={`
              h-2.5 rounded-full transition-all
              ${
								index === currentIndex
									? 'w-8 bg-cyan-400'
									: 'w-2.5 bg-white/40 hover:bg-white/70'
							}
            `}
					/>
				))}
			</div>
		</section>
	);
}

const slides = [
	{
		id: 1,
		src: '/banners/banner1.png',
		alt: 'TechPulse future tech sale promotion',
	},
	{
		id: 2,
		src: '/banners/banner2.png',
		alt: 'TechPulse gaming promotion',
	},
	{
		id: 3,
		src: '/banners/banner3.png',
		alt: 'TechPulse smartphone promotion',
	},
	{
		id: 4,
		src: '/banners/banner4.png',
		alt: 'TechPulse summer tech deals',
	},
];
