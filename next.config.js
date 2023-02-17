/** @type {import('next').NextConfig} */
const path = require('path');

// eslint-disable-next-line
const fs = require('fs-extra');

const loadCogoModules = () => {
	const rootDirectory = path.join(__dirname, './node_modules/@cogoport');
	const cogoModules = fs.readdirSync(rootDirectory)
		.map((file) => `@cogoport/${file}`);
	return cogoModules;
};

const modulesToTranspile = loadCogoModules();

module.exports = {
	reactStrictMode   : false,
	swcMinify         : true,
	basePath          : '/v2',
	transpilePackages : modulesToTranspile,
	webpack(config) {
		const newConfig = { ...config };
		newConfig.module.rules.push({
			test : /\.svg$/i,
			use  : [{ loader: '@svgr/webpack' }],
		});
		return config;
	},
};
