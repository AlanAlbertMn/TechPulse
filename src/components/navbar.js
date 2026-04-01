'use client';
import { Search, ShoppingCart, User} from 'lucide-react';
import { useEffect, useState } from 'react';
import techLogo from '../../assets/img/TechPulseLaptopWhite.svg';
import Image from 'next/image';
import CartDrawer from '@/components/cartdrawer'
import { useCart } from '@/lib/CartProvider';
import Link from 'next/link';

const Navbar = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const { setCart } = useCart();

	useEffect(() => {
	  // get cart from context for displaying it
	  localStorage.getItem('cart') ? setCart(JSON.parse(localStorage.getItem('cart'))) : '';
	}, [setCart])
	

	return (
		<>
			<nav className='fixed top-0 w-full bg-slate-950/70 backdrop-blur border-b border-slate-800 z-50'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
					<Link href='/'><Image src={techLogo} alt='TechStore logo' width={250} /></Link>

					<div className='hidden md:flex gap-6 items-center'>
						<div className='flex items-center bg-slate-900 px-3 py-2 rounded-xl'>
							<Search size={16} />
							<input
								className='bg-transparent ml-2 outline-none text-sm'
								placeholder='Buscar...'
							/>
						</div>

						<button onClick={() => setCartOpen(true)}>
							<ShoppingCart />
						</button>

						<User />
					</div>
				</div>
			</nav>
			{cartOpen && <CartDrawer handleCartOpen={setCartOpen} />}
		</>
	);
};

export default Navbar;
