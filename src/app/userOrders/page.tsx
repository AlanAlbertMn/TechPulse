import { getOrders } from '@/lib/orders';
import { getUserFromSession } from '../api/auth/core/session';
import { sessionSchema } from '@/types/User';
import OrderCard from '@/components/Card';
import { OrderWithItems } from '@/types/Order';

const userOrders = async () => {
	const user = (await getUserFromSession()) as sessionSchema;
	const orders: OrderWithItems[] = await getOrders(user.userId);
	console.log(orders);

	return (
		<div className='w-2/3 mx-auto pt-5 grid gap-4'>
			{orders.map((order) => (
				<OrderCard key={order.id} {...order} />
			))}
		</div>
	);
};

export default userOrders;
