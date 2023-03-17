import GLOBALS_CONSTANTS from '../constants/globals';

const isAmountValid = ({ amount }) => !(
	amount === null
		|| Array.isArray(amount)
		|| typeof amount === 'boolean'
		|| Number.isNaN(amount)
);

const getCurrencyLocale = ({ currency }) => {
	let currencyLocale = GLOBALS_CONSTANTS.currency_locale.INR;

	if (currency in GLOBALS_CONSTANTS.currency_locale) {
		currencyLocale = GLOBALS_CONSTANTS.currency_locale[currency];
	}

	return currencyLocale;
};

const format = ({ locale, amount, options, currency }) => {
	try {
		return new Intl.NumberFormat(locale, {
			...('style' in options && {
				currency: options?.currency || currency,
			}),
		}).format(Number(amount));
	} catch (error) {
		return 'null';
	}
};

/**
 *  @typedef {Object}             [arguments]
 *  @property {String|Number}     [amount]
 *  @property {String}            [currency]
 *  @property {Object}            [options]
 */

const getShortFormatNumber = (
	locale,
	price,
	currency,
	options = {},
	showCurrency = true,
	noRoundOff = false,
) => (currency
	? Intl.NumberFormat(locale, {
		style                 : showCurrency ? 'currency' : 'decimal',
		currency,
		notation              : noRoundOff ? 'standard' : 'compact',
		compactDisplay        : 'short',
		maximumFractionDigits : 2,
		...options,
	}).format(Number(price || 0))
	: null);

// const formatAmount = ({
// 	amount = '',
// 	currency = '',
// 	options = {},
// }) => {
// 	if (!isAmountValid({ amount })) {
// 		return null;
// 	}
// 	const UPPERCASE_CURRENCY = (currency || GLOBALS_CONSTANTS.currency_code.INR).toUpperCase();

// 	return format({
// 		locale   : getCurrencyLocale({ currency: UPPERCASE_CURRENCY }),
// 		amount,
// 		options,
// 		currency : UPPERCASE_CURRENCY,
// 	});
// };

const formatAmount = ({ amount = '', currency = '', options = {} }) => getShortFormatNumber(
	'en-US',
	amount || 0,
	currency,
	{
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},

	true,
	options?.notation === 'standard',
);

export default formatAmount;
