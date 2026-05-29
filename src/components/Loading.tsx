import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
	return (
		<div className='bg-slate-900 rounded-3xl p-5'>
			<SkeletonTheme baseColor='#202020' highlightColor='#333'>
				<Skeleton count={1} inline width={96} height={96} />
				<Skeleton count={7} />
			</SkeletonTheme>
		</div>
	);
};

export default Loading;
