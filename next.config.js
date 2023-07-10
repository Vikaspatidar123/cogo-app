/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const isProd = process.env.NODE_ENV === 'production';

const removeConsole = { exclude: ['error'] };

module.exports = {
	reactStrictMode : false,
	swcMinify       : true,
	i18n,
	// basePath        : '.',
	images          : {
		remotePatterns: [
			{
				protocol : 'https',
				hostname : 'cogoport-production.sgp1.digitaloceanspaces.com',
			},
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
				hostname : 'via.placeholder.com',
			},
			{
				protocol : 'https',
				hostname : 'airline-images-cogoport.s3.ap-south-1.amazonaws.com',
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
	compiler: {
		removeConsole: isProd ? removeConsole : false,
	},
};
