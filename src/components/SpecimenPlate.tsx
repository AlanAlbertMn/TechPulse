import Image from 'next/image';
import { cn } from '@/lib/utils';

type SpecimenPlateProps = {
	src: string;
	alt: string;
	sizes: string;
	/** Size and shape of the plate */
	className?: string;
	/** Padding and hover transforms for the image */
	imageClassName?: string;
	/** Overlays such as a discount badge */
	children?: React.ReactNode;
};

// Product shot on a light plate; multiply blend removes Amazon's white backdrop
export default function SpecimenPlate({
	src,
	alt,
	sizes,
	className,
	imageClassName,
	children,
}: SpecimenPlateProps) {
	return (
		<div
			className={cn(
				'relative overflow-hidden rounded-xl bg-linear-to-b from-plate to-plate-edge',
				className,
			)}
		>
			{children}
			<Image
				src={src}
				alt={alt}
				fill
				sizes={sizes}
				className={cn('object-contain p-4 mix-blend-multiply', imageClassName)}
			/>
		</div>
	);
}
