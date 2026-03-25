'use client';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import techLogo from '../../assets/img/TechPulseLaptopWhite.svg';
import Image from 'next/image';

const Navbar = () => {
	const [cartOpen, setCartOpen] = useState(false);

	return (
		<>
			<nav className='fixed top-0 w-full bg-slate-950/70 backdrop-blur border-b border-slate-800 z-50'>
				<div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
					<Image src={techLogo} alt='TechStore logo' width={250} />

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
			{/* CART DRAWER */}
			{cartOpen && (
				<div className='fixed inset-0 bg-black/50 z-50'>
					<div className='absolute right-0 top-0 h-full w-80 bg-slate-900 p-6'>
						<div className='flex justify-between mb-6'>
							<h2>Cart</h2>
							<button onClick={() => setCartOpen(false)}>
								<X />
							</button>
						</div>

						{cart.length === 0 && <p>No items</p>}

						{cart.map((item, i) => (
							<div key={i} className='mb-4'>
								<p>{item.product_title}</p>
								<p className='text-sm text-slate-400'>{item.product_price}</p>
							</div>
						))}

						<button className='mt-6 w-full bg-blue-500 py-3 rounded-xl'>
							Checkout
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
