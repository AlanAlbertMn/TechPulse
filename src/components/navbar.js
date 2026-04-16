import { LogIn, User } from 'lucide-react';
import techLogo from '../../assets/img/TechPulseLaptopWhite.svg';
import Image from 'next/image';
import Link from 'next/link';
import ShoppingCart from './ShoppingCart';
import { getUserFromSession } from '@/app/api/auth/core/session';
import LogOutButton from './LogOutButton';

async function Navbar() {
	const fullUser = await getUserFromSession({ withFullUser: true });

	return (
		<>
			<nav className='sticky top-0 w-full bg-slate-950/70 backdrop-blur border-b border-slate-800 z-50'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
					<Link href='/'>
						<Image src={techLogo} alt='TechStore logo' width={250} priority />
					</Link>

					<div className='hidden md:flex gap-6 items-center'>
						{/* <div className='flex items-center bg-slate-900 px-3 py-2 rounded-xl'>
							<Search size={16} />
							<input
								className='bg-transparent ml-2 outline-none text-sm'
								placeholder='Search...'
							/>
						</div> */}
						{fullUser && (
							<>
								<User />
								{fullUser.name}
								<LogOutButton />
							</>
						)}
						{!fullUser && (
							<div className='flex-nowrap'>
								<Link href='/login'>
									<LogIn size={30} />
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
