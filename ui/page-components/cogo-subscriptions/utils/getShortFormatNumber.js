const getShortFormatNumber = (
	locale,
	price,
	currency,
	options = {},
	showCurrency = true,
) =>
	currency
		? Intl.NumberFormat(locale, {
				style: showCurrency ? 'currency' : 'decimal',
				currency,
				maximumFractionDigits: 2,
				...options,
		  }).format(Number(price || 0))
		: null;

const shortFormatNumber = (amt, currency, showSymbol = true) => {
	return getShortFormatNumber(
		'en-US',
		amt || 0,
		currency,
		{
			currencyDisplay: 'symbol',
			maximumFractionDigits: 2,
		},

		showSymbol,
	);
};
export { getShortFormatNumber, shortFormatNumber };
