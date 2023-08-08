import formatAmount from '@/ui/commons/utils/formatAmount';

const handleLineItems = ({ items = [], source = '' }) => {
	const finalList = items.map((item) => {
		const { name, currency, price_discounted, price, unit } = item || {};
		const priceValue = source === 'manual' ? price : price_discounted;

		return ({
			features : name,
			unit,
			price    : formatAmount({
				amount  : priceValue,
				currency,
				options : {
					notation        : 'standard',
					style           : 'currency',
					currencyDisplay : 'code',

				},
			}),
		});
	});

	return finalList;
};

export default handleLineItems;
