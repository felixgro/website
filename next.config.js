/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom': 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils'
			});
		}

		return config;
	}
};

module.exports = nextConfig;
