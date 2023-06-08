export const getCurrencyDetail = ({ pricing, periods }) => {
	const planDetail = pricing?.[`${periods}`]?.[0];
	const currency = planDetail?.currency;
	const amount = planDetail?.price;
	const lowerCurrency = currency && currency?.toLowerCase();
	const preValue = `prev_value_${lowerCurrency}`;

	return { amount, currency, preValue };
};
