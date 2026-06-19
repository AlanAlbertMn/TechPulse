import { LogIn, UserCircle2 } from 'lucide-react';
import techLogoWhite from '../../assets/img/TechPulseLaptopWhite.svg';
import techLogo from '../../assets/img/TechPulseLaptop.svg';
import Image from 'next/image';
import Link from 'next/link';
import ShoppingCart from './ShoppingCart';
import { getUserFromSession } from '@/app/api/auth/core/session';
import LogOutButton from './LogOutButton';

async function Navbar() {
	const fullUser = await getUserFromSession({ withFullUser: true });

	return (
		<>
			<nav className='sticky top-0 w-full shadow-sm outline-2 outline-zinc-200 dark:outline-[#253648] backdrop-blur-xl bg-white dark:bg-slate-950/70 border-b-0 z-50'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
					<Link href='/'>
						<Image
							src={techLogoWhite}
							alt='TechStore logo'
							className='hidden dark:block'
							width={250}
							priority
						/>
						<Image
							src={techLogo}
							alt='TechStore logo'
							className='dark:hidden'
							width={250}
							priority
						/>
					</Link>

					<div className='hidden md:flex gap-6 items-center'>
						{fullUser && (
							<>
								<div className='flex gap-1 justify-center items-center'>
									<UserCircle2 color='#0369A1' size={30} />
									<Link
										href='/userOrders'
										className='text-sky-900 dark:text-slate-50 font-bold'
									>
										{fullUser.name}
									</Link>
								</div>
								<div className='cursor-pointer'>
									<LogOutButton />
								</div>
							</>
						)}
						{!fullUser && (
							<div className='flex-nowrap'>
								<Link href='/login'>
									<LogIn color='#0369A1' size={30} />
								</Link>
							</div>
						)}
						<ShoppingCart />
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
