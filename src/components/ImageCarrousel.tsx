'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

	useEffect(() => {
		if (photoArr.length === 0) {
			//fetch from API and save into db
			console.log('fetch from api');
		} else console.log(photoArr);
	}, [photoArr]);

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
			<div className='relative my-4 h-11/12'>
				<Image
					alt={title}
					className='rounded'
					fill
					loading='eager'
					style={{ objectFit: 'contain' }}
					src={mainPhoto}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>
			{photoArr && (
				<div className='w-full grid grid-cols-5 gap-3'>
					{photoArr.map((photo) => (
						<Image
							className='w-full h-full rounded overflow-hidden cursor-pointer'
							key={photo}
							src={photo}
							alt={photo}
							width={200}
							style={{ objectFit: 'cover' }}
							height={200}
							onClick={() => handleHoverIn(photo)}
							onMouseEnter={() => handleHoverIn(photo)}
							onMouseLeave={handleHoverOut}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageCarrousel;
