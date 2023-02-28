function getFormattedPrice(locale = 'en-IN', price, currency, options = {}) {
	return (currency
		? Number(price || 0).toLocaleString(locale, {
			style           : 'currency',
			currency,
			currencyDisplay : 'code',
			...options,
		})
		: null);
}
export default getFormattedPrice;
