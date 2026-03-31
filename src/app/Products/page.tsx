import Image from 'next/image';
// import { motion } from "framer-motion";
import { Product } from '@/types/Product';
import { Star } from 'lucide-react';
import {getProducts} from '@/lib/products'
import AddToCartButton from "@/components/AddToCartButton";
// import {amazonData} from '../../../assets/amazonData'

export default function Products() {
	// Fix using DB as calling getProducts on client component throws error
	const dummyProds = getProducts();

	// const dummyProds = amazonData;

	
	
	return (
		<>
			{dummyProds.map((product: Product) => (
				<div key={product.asin} className='bg-slate-900 p-4 inline-grid rounded-2xl border border-slate-800 cursor-pointer'>
					<Image
						src={product.product_photo}
						alt={product.product_title}
						height={300}
						width={300}
						className='rounded-xl mb-2 size-full max-h-40'
					/>

					<h3 className='font-semibold mt-2'>{`${product.product_title.split(' ').slice(0,8).join(' ')}...`}</h3>

					<p className='text-blue-400'>{product.product_price}</p>
					
					<div className='flex items-center mb-3'>
						<p className='mr-1'>{product.product_star_rating}</p>
						{[...Array(parseInt(product.product_star_rating))].map((_, i) => (
							<Star key={i} size={14} />
						))}
					</div>
					<AddToCartButton product={product}/>
				</div>
			))}
		</>
	);
};