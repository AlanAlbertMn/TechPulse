import { StarHalfIcon, StarIcon } from '@phosphor-icons/react/ssr';

// Rounds to the nearest half star
export default function RatingStars({ rating }: { rating: number }) {
	const halves = Math.round(rating * 2);

	return (
		<span
			role='img'
			aria-label={`Rated ${rating.toFixed(1)} out of 5`}
			className='flex text-signal'
		>
			{Array.from({ length: 5 }, (_, i) => {
				const filled = halves - i * 2;
				if (filled >= 2) return <StarIcon key={i} weight='fill' />;
				if (filled === 1) return <StarHalfIcon key={i} weight='fill' />;
				return <StarIcon key={i} className='text-border' />;
			})}
		</span>
	);
}
