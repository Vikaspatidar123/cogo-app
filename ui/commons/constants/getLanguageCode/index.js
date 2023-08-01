const getLanguageCode = (locale) => {
	const newLocale = locale === 'default' ? 'en-IN' : locale;

	return newLocale.split('-')[0];
};

export default getLanguageCode;
