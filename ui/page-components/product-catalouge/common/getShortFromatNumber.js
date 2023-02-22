const getShortFormatNumber = (
	locale,
	price,
	currency,
	options = {},
	showCurrency = true,
) => (currency
	? Intl.NumberFormat(locale, {
		style                 : showCurrency ? 'currency' : 'decimal',
		currency,
		notation              : 'compact',
		compactDisplay        : 'short',
		maximumFractionDigits : 2,
		...options,
	}).format(Number(price || 0))
	: null);

const shortFormatNumber = (amt, currency, showSymbol = true) => getShortFormatNumber(
	'en-US',
	amt || 0,
	currency,
	{
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},

	showSymbol,
);
export { getShortFormatNumber, shortFormatNumber };
