import GLOBALS_CONSTANTS from '../constants/globals';

const isAmountValid = ({ amount }) => !(
	amount === null
		|| Array.isArray(amount)
		|| typeof amount === 'boolean'
		// eslint-disable-next-line no-restricted-globals
		|| isNaN(amount)
);

const getCurrencyLocale = ({ currency }) => {
	let currencyLocale = GLOBALS_CONSTANTS.currency_locale.INR;

	if (currency in GLOBALS_CONSTANTS.currency_locale) {
		currencyLocale = GLOBALS_CONSTANTS.currency_locale[currency];
	}

	return currencyLocale;
};

const format = ({ locale, amount, options, currency }) => new Intl.NumberFormat(locale, {
	...options,
	...('style' in options && {
		currency: options.currency || currency,
	}),
}).format(Number(amount));

/**
 *  @typedef {Object}             [arguments]
 *  @property {String|Number}     [amount]
 *  @property {String}            [currency]
 *  @property {Object}            [options]
 */

const formatAmount = ({
	amount = '',
	currency = GLOBALS_CONSTANTS.currency_code.INR,
	options = {},
}) => {
	if (!isAmountValid({ amount })) {
		return null;
	}

	const UPPERCASE_CURRENCY = (currency || '').toUpperCase();

	return format({
		locale   : getCurrencyLocale({ currency: UPPERCASE_CURRENCY }),
		amount,
		options,
		currency : UPPERCASE_CURRENCY,
	});
};

export default formatAmount;
