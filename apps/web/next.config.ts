import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	poweredByHeader: false,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
};

export default nextConfig;
