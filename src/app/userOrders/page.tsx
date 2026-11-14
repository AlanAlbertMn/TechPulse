import Link from 'next/link';
import { redirect } from 'next/navigation';
import * as motion from 'motion/react-client';
import { ArrowRightIcon, PackageIcon } from '@phosphor-icons/react/ssr';
import { getOrders } from '@/lib/orders';
import { getUserFromSession } from '../api/auth/core/session';
import { RedisUser } from '@/types/User';
import OrderCard from '@/components/Card';
import { OrderWithItems } from '@/types/Order';
import { Button } from '@/components/ui/button';
import PageShell from '@/components/layout/PageShell';
import PageHeader from '@/components/layout/PageHeader';
import StatList from '@/components/layout/StatList';
import StatusMessage from '@/components/layout/StatusMessage';
import { rise } from '@/lib/motion';

const userOrders = async () => {
	const user = (await getUserFromSession()) as RedisUser | null;
	if (!user) redirect('/login');

	const orders: OrderWithItems[] = await getOrders(user.userId);

	// Display-only stats derived from the same data
	const units = orders.reduce(
		(n, order) => n + order.items.reduce((m, item) => m + item.quantity, 0),
		0,
	);
	const spent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

	return (
		<PageShell bloom='left'>
			<PageHeader
				crumb='Orders'
				title={['ORDER', 'LOG.']}
				aside={
					orders.length > 0 && (
						<StatList
							stats={[
								{ label: 'Orders', value: String(orders.length).padStart(2, '0') },
								{ label: 'Units', value: String(units).padStart(2, '0') },
								{ label: 'Total spent', value: `$${spent.toFixed(2)}` },
							]}
						/>
					)
				}
			/>

			{orders.length === 0 ? (
				<StatusMessage
					icon={<PackageIcon weight='thin' />}
					title='No orders yet.'
					description="You haven't placed any orders yet. Everything you buy will be logged here."
				>
					<Button
						nativeButton={false}
						render={<Link href='/' />}
						className='h-12 gap-2 px-6 text-sm font-extrabold tracking-wide uppercase hover:bg-signal hover:text-signal-foreground'
					>
						Browse catalog <ArrowRightIcon weight='bold' />
					</Button>
				</StatusMessage>
			) : (
				/* Timeline: a rail on the left with a node per order */
				<ol className='relative flex flex-col gap-10 md:pl-12'>
					<span
						aria-hidden
						className='absolute top-2 bottom-2 left-[7px] hidden w-px bg-linear-to-b from-signal via-border to-transparent md:block'
					/>
					{orders.map((order, index) => (
						<motion.li key={order.id} variants={rise} className='relative'>
							<span
								aria-hidden
								className='absolute top-6 -left-12 hidden size-[15px] place-items-center rounded-full border bg-background md:grid'
							>
								<span
									className={
										index === 0
											? 'size-1.5 rounded-full bg-signal animate-signal-pulse'
											: 'size-1.5 rounded-full bg-muted-foreground'
									}
								/>
							</span>
							<OrderCard {...order} />
						</motion.li>
					))}
				</ol>
			)}
		</PageShell>
	);
};

export default userOrders;
