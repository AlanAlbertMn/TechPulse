import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactCompiler: true,
	// The sidebar occupies the bottom-left corner, where the indicator sits by default
	devIndicators: { position: 'bottom-right' },
	images: {
		remotePatterns: [new URL('https://m.media-amazon.com/images/I/**')],
	},
};
export default nextConfig;
