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
			{
				protocol : 'https',
				hostname : 'prod-cogoport.s3.ap-south-1.amazonaws.com',
			},
			{
				protocol : 'https',
				hostname : 'cogoport-production.sgp1.digitaloceanspaces.com',
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
