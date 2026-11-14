import ProductsBrowser from '@/components/ProductsBrowser';
import { getProducts } from '@/lib/products';
import { getUserFromSession } from '@/app/api/auth/core/session';
import { sessionSchema } from '@/types/User';
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import SiteFooter from '@/components/home/SiteFooter';
import type { Product } from '@prisma/client';

function shortTitle(title: string, words = 4) {
	return title.split(' ').slice(0, words).join(' ');
}

// Ticker copy derived from the live catalog rather than placeholder text
function buildTickerItems(products: Product[]) {
	if (products.length === 0) return [{ text: 'Catalog syncing…' }];

	const topRated = products.reduce((a, b) => (b.rating > a.rating ? b : a));
	const cheapest = products.reduce((a, b) => (b.price < a.price ? b : a));
	const maxDiscount = Math.max(
		0,
		...products.map((p) =>
			p.original_price && p.original_price > p.price
				? Math.round((1 - p.price / p.original_price) * 100)
				: 0,
		),
	);

	return [
		{ text: `${products.length} devices indexed` },
		...(maxDiscount > 0
			? [{ text: `Deals up to ${maxDiscount}% off`, highlight: true }]
			: []),
		{ text: `Top rated: ${shortTitle(topRated.title)} ★ ${topRated.rating.toFixed(1)}` },
		{ text: `Entry point from $${cheapest.price.toFixed(2)}` },
		{ text: 'Secure checkout via Stripe' },
	];
}

export default async function Ecommerce() {
	const products = await getProducts();
	const user = (await getUserFromSession()) as sessionSchema;

	const topProduct =
		products.length > 0
			? products.reduce((a, b) => (b.rating > a.rating ? b : a))
			: null;

	return (
		<main>
			<Hero productCount={products.length} topProduct={topProduct} />
			<Ticker items={buildTickerItems(products)} />
			<ProductsBrowser products={products} user={user} />
			<SiteFooter />
		</main>
	);
}
