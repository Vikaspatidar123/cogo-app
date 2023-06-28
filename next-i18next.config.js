const path = require('path');

module.exports = {
	i18n: {
		defaultLocale   : 'default',
		locales         : ['default', 'en-IN', 'vi-VN'],
		localeDetection : false,
	},
	// eslint-disable-next-line valid-typeof
	...(typeof window === undefined
		? { localePath: path.resolve('./public/locales') }
		: {}),
};
