import Link from 'next/link';
import {
	LightningIcon,
	PackageIcon,
	SignInIcon,
	SquaresFourIcon,
} from '@phosphor-icons/react/ssr';
import { User } from '@prisma/client';
import { getUserFromSession } from '@/app/api/auth/core/session';
import NavLink from './NavLink';
import ShoppingCart from './ShoppingCart';
import UserMenu from './UserMenu';

// Fixed vertical rail on desktop, floating bottom dock on mobile.
async function Navbar() {
	const fullUser = (await getUserFromSession(true)) as User | null;

	return (
		<nav className='fixed inset-x-4 bottom-4 z-50 flex items-center justify-between rounded-2xl border border-sidebar-border bg-sidebar px-5 py-3 shadow-[inset_0_1px_0_var(--sidebar-border)] backdrop-blur-xl md:inset-x-auto md:top-0 md:bottom-auto md:left-0 md:h-dvh md:w-20 md:flex-col md:rounded-none md:border-y-0 md:border-l-0 md:px-0 md:py-8'>
			<Link
				href='/'
				aria-label='TechPulse home'
				className='group grid size-10 place-items-center'
			>
				<span className='grid size-8 rotate-45 place-items-center rounded-sm bg-foreground transition-transform duration-500 ease-spring group-hover:rotate-135'>
					<span className='size-3 bg-accent' />
				</span>
			</Link>

			<div className='flex items-center gap-4 md:flex-col md:gap-6'>
				<NavLink href='/' label='Catalog'>
					<SquaresFourIcon />
				</NavLink>
				<NavLink href='/deals' label='Deals'>
					<LightningIcon />
				</NavLink>
				{fullUser && (
					<NavLink href='/userOrders' label='My orders'>
						<PackageIcon />
					</NavLink>
				)}
			</div>

			<div className='flex items-center gap-3 md:flex-col md:gap-4'>
				<ShoppingCart />
				{fullUser ? (
					<UserMenu name={fullUser.name} email={fullUser.email} />
				) : (
					<NavLink href='/login' label='Sign in'>
						<SignInIcon />
					</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
