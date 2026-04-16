'use client';
import { logOut } from '@/app/api/auth/nextjs/actions';
import { LogOutIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function LogOutButton() {
	return (
		<LogOutIcon
			onClick={() => {
				logOut().finally(redirect('/'));
			}}
		/>
	);
}
