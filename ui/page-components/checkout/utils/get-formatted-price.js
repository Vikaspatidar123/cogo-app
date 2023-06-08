const getFormattedPrice = (price, currency, options = {}) => {
	if (!currency) {
		return null;
	}
	return Number(price || 0).toLocaleString('en-IN', {
		style           : 'currency',
		currency,
		currencyDisplay : 'code',
		...options,
	});
};

export default getFormattedPrice;
