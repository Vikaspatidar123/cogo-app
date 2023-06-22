import formatAmount from '@/ui/commons/utils/formatAmount';

const handleLineItems = ({ items = [], source = '' }) => {
	let finalList = [];

	items.forEach((item) => {
		const { name, currency, price_discounted, price, unit } = item || {};
		const priceValue = source === 'manual' ? price : price_discounted;

		finalList = [
			...finalList,
			{
				features: name,
				price:
					formatAmount({
						amount  : priceValue,
						currency,
						options : {
							notation : 'standard',
							style    : 'currency',
						},
					}),
				unit,
			},
		];
	});

	return finalList;
};

export default handleLineItems;
