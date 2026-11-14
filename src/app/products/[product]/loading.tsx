import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<main className='mx-auto max-w-[1400px] px-6 pt-8 pb-16 md:px-12'>
			<Skeleton className='mb-12 h-4 w-40' />
			<div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20'>
				<div className='flex flex-col gap-4'>
					<Skeleton className='aspect-square w-full rounded-2xl' />
					<div className='flex gap-3'>
						{Array.from({ length: 5 }, (_, i) => (
							<Skeleton key={i} className='size-20 rounded-lg' />
						))}
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<Skeleton className='h-3 w-48' />
					<Skeleton className='h-16 w-full' />
					<Skeleton className='h-16 w-3/4' />
					<Skeleton className='h-5 w-2/3' />
					<Skeleton className='mt-4 h-5 w-56' />
					<Skeleton className='mt-4 h-14 w-48' />
					<Skeleton className='mt-6 h-14 w-full' />
					<Skeleton className='h-14 w-full' />
				</div>
			</div>
		</main>
	);
};

export default Loading;
