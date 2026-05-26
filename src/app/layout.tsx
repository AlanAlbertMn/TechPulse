import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/lib/CartProvider';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/navbar';

const robotoSans = Roboto({
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
		<html lang='en' className={`${robotoSans.className} h-full antialiased`}>
			<CartProvider>
				<body>
					<Navbar />
					{children}
					<ToastContainer />
				</body>
			</CartProvider>
		</html>
	);
}
