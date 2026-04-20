import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/lib/CartProvider';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/navbar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'TechPulse by Alan Albert',
	description: 'Next Level technology store',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<CartProvider>
				<body className='bg-slate-950! min-h-full flex flex-col'>
					<Navbar />
					{children}
					<ToastContainer />
				</body>
			</CartProvider>
		</html>
	);
}
