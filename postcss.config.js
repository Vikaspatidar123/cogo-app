module.exports = {
	plugins: [
		'postcss-flexbugs-fixes',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage    : 3,
				features : {
					'custom-media-queries' : true,
					'custom-properties'    : false,
				},
			},
		],
		'postcss-nested',
	],

};
