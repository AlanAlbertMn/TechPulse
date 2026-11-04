import { getOrders } from '@/lib/orders';
import { redirect } from 'next/navigation';
import { getUserFromSession } from '../api/auth/core/session';
import { RedisUser } from '@/types/User';
import OrderCard from '@/components/Card';
import { OrderWithItems } from '@/types/Order';

const userOrders = async () => {
	const user = (await getUserFromSession()) as RedisUser | null;
	if (!user) redirect('/login');

	const orders: OrderWithItems[] = await getOrders(user.userId);

	return (
		<div className='md:w-2/3 mx-auto pt-5 px-4 grid gap-4'>
			{orders.length === 0 && (
				<p className='text-center text-2xl py-12'>
					You haven&apos;t placed any orders yet.
				</p>
			)}
			{orders.map((order) => (
				<OrderCard key={order.id} {...order} />
			))}
		</div>
	);
};

export default userOrders;
