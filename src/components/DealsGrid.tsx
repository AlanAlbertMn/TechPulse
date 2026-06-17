import DealCard from './DealCard';

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

const DealsGrid = ({ deals }: { deals: Deal[] }) => {
	return (
		<div className='flex flex-col gap-8'>
			{deals.map((deal) => (
				<DealCard key={deal.product_asin} {...deal} />
			))}
		</div>
	);
};

export default DealsGrid;
