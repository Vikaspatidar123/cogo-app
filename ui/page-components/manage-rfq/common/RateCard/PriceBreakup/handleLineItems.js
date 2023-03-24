import formatAmount from '@/packages/forms/utils/get-formatted-price';

const handleLineItems = ({ items = [] }) => {
	let finalList = [];

	items.forEach((item) => {
		const { name, currency, price_discounted, unit } = item || {};
		finalList = [
			...finalList,
			{
				features : name,
				price    : formatAmount(
					price_discounted,
					currency,
					{
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				),
				unit,
			},
		];
	});

	return finalList;
};

export default handleLineItems;
