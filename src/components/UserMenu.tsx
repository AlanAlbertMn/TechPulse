'use client';

import Link from 'next/link';
import { PackageIcon, SignOutIcon } from '@phosphor-icons/react';
import { logOut } from '@/app/api/auth/nextjs/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type UserMenuProps = {
	name: string;
	email: string;
};

export default function UserMenu({ name, email }: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label={`Account menu for ${name}`}
				className='rounded-full ring-1 ring-transparent transition outline-none hover:ring-foreground focus-visible:ring-2 focus-visible:ring-ring data-popup-open:ring-signal'
			>
				<Avatar className='size-10'>
					<AvatarFallback className='bg-secondary font-heading text-sm font-black text-foreground uppercase'>
						{name.charAt(0)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			{/* Opens beside the rail on desktop; on the mobile dock "right" flips to fit */}
			<DropdownMenuContent
				side='right'
				align='end'
				sideOffset={16}
				className='w-60 rounded-xl p-1.5'
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className='flex flex-col gap-0.5 px-2 py-2'>
						<span className='truncate font-display text-base font-black text-foreground'>
							{name}
						</span>
						<span className='truncate font-mono text-[11px] font-normal'>
							{email}
						</span>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					render={<Link href='/userOrders' />}
					className='gap-2 px-2 py-2'
				>
					<PackageIcon /> My orders
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					variant='destructive'
					// logOut() is a Server Action that deletes the session and redirects to '/'
					onClick={() => logOut()}
					className='gap-2 px-2 py-2'
				>
					<SignOutIcon /> Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
