'use client';
import Image from 'next/image';
import { useState } from 'react';

const ImageCarrousel = ({
	photo,
	title,
	photoArr,
}: {
	photo: string;
	title: string;
	photoArr: string[];
}) => {
	const [mainPhoto, setMainPhoto] = useState<string>(photo);
	const [tmpPhoto, setTmpPhoto] = useState<string>('');

	const handleHoverIn = (photo: string) => {
		setTmpPhoto(mainPhoto);
		setMainPhoto(photo);
	};

	const handleHoverOut = () => {
		setMainPhoto(tmpPhoto);
		setTmpPhoto('');
	};

	return (
		<div className='mx-auto w-1/2'>
			<div className='relative h-11/12'>
				<Image
					src={mainPhoto}
					alt={title}
					objectFit='contain'
					loading='eager'
					fill
				/>
			</div>
			{photoArr && (
				<div className='w-full mt-6 grid grid-cols-5 gap-3'>
					{photoArr.map((photo) => (
						<Image
							className='w-full h-2/3 rounded'
							key={photo}
							src={photo}
							alt={photo}
							width={300}
							height={300}
							onClick={() => handleHoverIn(photo)}
							onMouseEnter={() => handleHoverIn(photo)}
							onMouseLeave={handleHoverOut}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageCarrousel;
