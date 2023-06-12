/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode : false,
	swcMinify       : true,
	// basePath        : '.',
	webpack(config) {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
};
