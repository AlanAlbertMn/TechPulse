import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/lib/CartProvider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Body (Cabinet Grotesk) and display (Satoshi) fonts are served by Fontshare's
// CDN, as their licence allows; the font files are not redistributed in this repo.
// One stylesheet per family: Fontshare can drop a family when they share a URL.
const FONTSHARE_CSS = [
	'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@200,300,400,500,700,800,900&display=swap',
	'https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap',
];

// Mono
const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'TechPulse by Alan Albert',
	description: 'Your tech go-to',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={cn(
				'dark h-full antialiased',
				jetbrainsMono.variable,
			)}
		>
			<head>
				<link rel='preconnect' href='https://api.fontshare.com' />
				<link rel='preconnect' href='https://cdn.fontshare.com' crossOrigin='' />
				{FONTSHARE_CSS.map((href) => (
					<link key={href} rel='stylesheet' href={href} />
				))}
			</head>
			<body className='min-h-dvh font-sans'>
				<CartProvider>
					<TooltipProvider>
						<Navbar />
						<div className='min-h-dvh pb-28 md:pb-0 md:pl-20'>{children}</div>
						<Toaster />
					</TooltipProvider>
				</CartProvider>
			</body>
		</html>
	);
}
