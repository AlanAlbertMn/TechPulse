import { LogIn, UserCircle2 } from 'lucide-react';
import techLogoWhite from '../../assets/img/TechPulseLaptopWhite.svg';
import techLogo from '../../assets/img/TechPulseLaptop.svg';
import Image from 'next/image';
import Link from 'next/link';
import ShoppingCart from './ShoppingCart';
import { getUserFromSession } from '@/app/api/auth/core/session';
import LogOutButton from './LogOutButton';
import { User } from '@prisma/client';

async function Navbar() {
	const fullUser = (await getUserFromSession(true)) as User;

	return (
		<>
			<nav className='sticky top-0 w-full shadow-sm outline-2 outline-zinc-200 dark:outline-[#253648] backdrop-blur-xl bg-white dark:bg-slate-950/70 border-b-0 z-50'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
					<Link href='/'>
						<Image
							src={techLogoWhite}
							alt='TechPulse logo'
							className='hidden dark:block w-2/3 md:w-1/4'
							priority
						/>
						<Image
							src={techLogo}
							alt='TechPulse logo'
							className='dark:hidden'
							width={200}
							priority
						/>
					</Link>

					<div className='flex gap-3 items-center justify-end'>
						{fullUser && (
							<>
								<div className='flex gap-1 justify-center items-center'>
									<UserCircle2 color='#2563EB' className='size-7 md:size-9' />
									<Link
										href='/userOrders'
										className='text-sky-900 dark:text-slate-50 font-bold text-xl'
									>
										{fullUser.name.split(' ')[0]}
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
									<LogIn color='#2563EB' className='size-7 md:size-8' />
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
