import { Product } from '@prisma/client';

export interface ProductsProps {
	products: ProductPreview[];
}

export interface CartProps {
	product: Product;
	quantity: number;
}

// export type Product = {
// 	asin: string;
// 	product_title: string;
// 	product_price: string;
// 	product_original_price?: string;
// 	currency?: string;
// 	unit_price?: string;
// 	unit_count?: number;
// 	product_photo: string;
// 	product_photos?: string[];
// 	product_star_rating: string;
// 	product_num_ratings: number;
// 	delivery?: string;
// 	sales_volume?: string;
// };

export interface ProductPreview {
	asin: string;
	title: string;
	price: number;
	original_price?: number;
	thumbnail: string;
	rating: number;
}

export interface ProductDetails extends ProductPreview {
	images: string[];
	num_ratings: number;
	description?: string;
	delivery_price?: string;
	delivery_time?: string;
	sales_volume?: string;
	about_product?: string[];
	brand?: string;
}
