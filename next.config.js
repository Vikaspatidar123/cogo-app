/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode : false,
	swcMinify       : true,
	basePath        : '/v2',
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
