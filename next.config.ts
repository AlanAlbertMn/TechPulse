import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactCompiler: true,
};

module.exports = {
	images: {
		remotePatterns: [new URL('https://m.media-amazon.com/images/I/**')],
	},
};
export default nextConfig;
