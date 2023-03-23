import usei18n, { getFormattedPrice } from 'i18next';

const handleLineItems = ({ items = [], source = '' }) => {
	const { numLocale } = usei18n();
	let finalList = [];

	items.forEach((item) => {
		const { name, currency, price_discounted, price, unit } = item || {};
		const priceValue = source === 'manual' ? price : price_discounted;

		finalList = [
			...finalList,
			{
				features : name,
				price    : getFormattedPrice(numLocale, priceValue, currency),
				unit,
			},
		];
	});

	return finalList;
};

export default handleLineItems;
