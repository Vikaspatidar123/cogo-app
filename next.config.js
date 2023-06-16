/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
	reactStrictMode : false,
	swcMinify       : true,
	i18n,
	// basePath        : '.',
	images          : {
		remotePatterns: [
			{
				protocol : 'https',
				hostname : 'cdn.cogoport.io',

			},

		],

	},
	webpack(config) {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
};
