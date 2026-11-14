import DealCard from './DealCard';
import InViewItem from './InViewItem';
import { cn } from '@/lib/utils';

export type Deal = {
	deal_id: string;
	deal_type: string;
	deal_title: string;
	deal_photo: string;
	deal_state: string;
	deal_url: string;
	canonical_deal_url: string;
	deal_starts_at: string | null;
	deal_ends_at: string | null;
	deal_price: {
		amount: number;
		currency: string;
	};
	list_price: {
		amount: number;
		currency: string;
	};
	savings_percentage: number;
	savings_amount: {
		amount: number;
		currency: string;
	};
	deal_badge: string;
	type: string;
	product_asin: string;
	percent_claimed: string | null;
	percent_claimed_message: string | null;
};

const DealsGrid = ({
	deals,
	featureFirst = false,
}: {
	deals: Deal[];
	/** Give the first deal the wide layout (default "featured" order only) */
	featureFirst?: boolean;
}) => {
	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{deals.map((deal, index) => {
				const featured = featureFirst && index === 0;
				return (
					<InViewItem
						key={deal.product_asin}
						index={index}
						className={cn(featured && 'sm:col-span-2')}
					>
						<DealCard deal={deal} featured={featured} />
					</InViewItem>
				);
			})}
		</div>
	);
};

export default DealsGrid;
