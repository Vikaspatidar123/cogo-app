/* eslint-disable no-mixed-spaces-and-tabs */
const getShortFormatNumber = (
	locale,
	price,
	currency,
	options = {},
	showCurrency = true,
	noRoundOff = false,

) => (currency
	? Intl.NumberFormat(locale, {
		style    : showCurrency ? 'currency' : 'decimal',
		currency,
		notation : noRoundOff ? 'standard' : 'compact',

		compactDisplay        : 'short',
		minimumFractionDigits : 2,
		...options,
		  }).format(Number(price || 0))
	: null);

const shortFormatNumber = (amt, currency, noRoundOff = false, showSymbol = true) => getShortFormatNumber(
	'en-US',
	amt || 0,
	currency,
	{
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},

	showSymbol,
	noRoundOff,
);
export { getShortFormatNumber, shortFormatNumber };
