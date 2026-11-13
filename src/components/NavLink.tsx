'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type NavLinkProps = {
	href: string;
	label: string;
	children: React.ReactNode;
};

export default function NavLink({ href, label, children }: NavLinkProps) {
	const pathname = usePathname();
	// Product pages live under the catalog
	const active =
		href === '/'
			? pathname === '/' || pathname.startsWith('/products')
			: pathname.startsWith(href);

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Link
						href={href}
						aria-label={label}
						aria-current={active ? 'page' : undefined}
					/>
				}
				className={cn(
					'relative grid size-10 place-items-center rounded-lg text-2xl text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
					active && 'text-signal hover:text-signal',
				)}
			>
				{children}
				{active && (
					<span className='absolute top-1 right-1 size-1.5 rounded-full bg-signal animate-signal-pulse' />
				)}
			</TooltipTrigger>
			<TooltipContent side='right' sideOffset={12}>
				{label}
			</TooltipContent>
		</Tooltip>
	);
}
