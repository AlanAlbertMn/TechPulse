import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = async () => {
	return (
		<div>
			<div className='w-2/3 mx-auto pt-7 grid gap-7'>
				<SkeletonTheme baseColor='#202020' highlightColor='#333'>
					<div className='bg-slate-900 rounded-3xl p-5 flex gap-4'>
						<Skeleton inline={true} width={96} height={96} />
						<Skeleton count={7} containerClassName='flex-1' />
					</div>
					<div className='bg-slate-900 rounded-3xl p-5 flex gap-4'>
						<Skeleton inline={true} width={96} height={96} />
						<Skeleton count={7} containerClassName='flex-1' />
					</div>
					<div className='bg-slate-900 rounded-3xl p-5 flex gap-4'>
						<Skeleton inline={true} width={96} height={96} />
						<Skeleton count={7} containerClassName='flex-1' />
					</div>
				</SkeletonTheme>
			</div>
		</div>
	);
};

export default loading;
