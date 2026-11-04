'use client';
import { logOut } from '@/app/api/auth/nextjs/actions';
import { LogOutIcon } from 'lucide-react';

export default function LogOutButton() {
	return (
		// logOut() is a Server Action that deletes the session and redirects to '/'
		<button type='button' aria-label='Log out' onClick={() => logOut()}>
			<LogOutIcon color='#2563EB' className='size-7 md:size-8 cursor-pointer' />
		</button>
	);
}
