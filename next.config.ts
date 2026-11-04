import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [new URL('https://m.media-amazon.com/images/I/**')],
	},
};
export default nextConfig;
