import styles from './styles.module.css';

const findAllOccurrences = (str, substr) => {
	const result = {};

	let idx = str.indexOf(substr);

	while (idx !== -1) {
		const value = str.substring(idx + 11, idx + 14);

		if (!result[value]) {
			result[value] = true;
		}

		idx = str.indexOf(substr, idx + 1);
	}

	return result;
};

function CheckoutServicesExchangeRate({ rate, summary }) {
	const { base_currency, currencies, currency_conversion_delta } =		summary.currency_conversions;

	const allCurrencies = findAllOccurrences(JSON.stringify(rate), 'currency');
	delete allCurrencies[base_currency];

	const currenciesWithValue = [];

	Object.keys(allCurrencies).forEach((currency) => {
		const conversionValue = currencies[currency];

		if (conversionValue) {
			currenciesWithValue.push(
				`1 ${currency} = ${base_currency} ${(
					conversionValue
					* (1 + currency_conversion_delta)
				).toFixed(2)}`,
			);
		}
	});

	if (!currenciesWithValue.length) {
		return null;
	}

	return (
		<div className={styles.container}>
			{'Currency Exchange: '}
			{currenciesWithValue.join(' | ')}
			<div className={styles.note}>
				*
				<u>We save you money</u>
				{' '}
				by charging shown Exchange Rate, irrespective
				exhange rate increase fluctuation
			</div>
		</div>
	);
}

export default CheckoutServicesExchangeRate;
