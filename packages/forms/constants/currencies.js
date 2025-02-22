// eslint-disable-next-line import/no-unresolved
import countries from '../../../.data-store/constants/countries.json';

const previousCurriencies = [];
const optionsAll = [];
(countries || []).forEach((country) => {
	if (
		country.currency_code
		&& !previousCurriencies.includes(country.currency_code)
	) {
		previousCurriencies.push(country.currency_code);
		optionsAll.push({
			label : country.currency_code,
			value : country.currency_code,
			key   : country.currency_code,
		});
	}
});
const prefferedCurrencies = ['INR', 'VND', 'USD', 'GBP', 'EUR'];

const prefferedOptons = optionsAll.filter((option) => prefferedCurrencies.includes(option.key));

const restOptionsList = optionsAll.filter(
	(option) => !prefferedCurrencies.includes(option.key),
);
// const restOptions = sort(restOptionsList, { key: 'label' });
const options = [...prefferedOptons, ...restOptionsList];
export default options;
