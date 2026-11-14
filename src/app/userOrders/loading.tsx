import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
	return (
		<div className='mx-auto max-w-[1400px] px-6 pt-8 pb-24 md:px-12'>
			<Skeleton className='mb-8 h-4 w-40 lg:mb-12' />
			<div className='mb-12 flex flex-col gap-10 border-b pb-10 lg:mb-16 lg:flex-row lg:items-end lg:justify-between'>
				<div className='flex flex-col gap-3'>
					<Skeleton className='h-20 w-72 lg:h-32 lg:w-[28rem]' />
					<Skeleton className='h-20 w-56 lg:h-32 lg:w-80' />
				</div>
				<Skeleton className='h-16 w-full max-w-md' />
			</div>
			<div className='flex flex-col gap-10 md:pl-12'>
				{[0, 1, 2].map((i) => (
					<Skeleton key={i} className='h-64 rounded-xl' />
				))}
			</div>
		</div>
	);
};

export default loading;
