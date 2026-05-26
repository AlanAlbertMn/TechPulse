import { OrderWithItems } from '@/types/Order';
import OrderItemCard from './OrderItem';

const OrderCard = (order: OrderWithItems) => {
	return (
		<div className='mt-2 bg-slate-900 rounded-2xl'>
			<div className='flex justify-between m-4'>
				<p>Ordered on {order.createdAt.toDateString()}</p>
				<p>Total: ${order.totalAmount}</p>
				<p>Status: {order.status}</p>
				<p>Order N° {order.id}</p>
			</div>
			<div>
				{order.items.map((item) => (
					<OrderItemCard key={item.id} {...item} />
				))}
			</div>
		</div>
	);
};

export default OrderCard;
