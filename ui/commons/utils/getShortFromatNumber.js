const getShortFormatNumber = (price, currency, options = {}, locale = 'en-IN') => (currency
	? Intl.NumberFormat(locale, {
		style                 : 'currency',
		currency,
		notation              : 'compact',
		compactDisplay        : 'short',
		minimumFractionDigits : 2,
		...options,
	}).format(Number(price || 0))
	: null);

export default getShortFormatNumber;
