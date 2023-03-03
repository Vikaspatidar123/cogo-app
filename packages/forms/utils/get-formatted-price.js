function getFormattedPrice(price, currency, options = {}, locale = 'en-IN') {
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
