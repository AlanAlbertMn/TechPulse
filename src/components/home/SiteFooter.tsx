import Link from 'next/link';

const links = [
	{ href: '/', label: 'Catalog' },
	{ href: '/deals', label: 'Deals' },
	{ href: '/cart', label: 'Cart' },
	{ href: '/userOrders', label: 'Orders' },
];

export default function SiteFooter() {
	return (
		<footer className='relative overflow-hidden border-t px-6 pt-16 pb-10 md:px-12'>
			<div className='flex flex-col items-start justify-between gap-10 md:flex-row md:items-end'>
				<div>
					<p className='font-mono text-xs tracking-widest text-muted-foreground uppercase'>
						© 2026 // Built by Alan Albert
					</p>
				</div>
				<nav className='flex gap-8 text-sm text-muted-foreground'>
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className='transition-colors hover:text-foreground'
						>
							{link.label}
						</Link>
					))}
				</nav>
			</div>
			<p
				aria-hidden
				className='mt-10 font-display text-[15vw] leading-[0.8] font-black tracking-tighter bg-linear-to-b from-secondary to-transparent bg-clip-text text-transparent select-none md:text-[13vw]'
			>
				TECHPULSE
			</p>
		</footer>
	);
}
