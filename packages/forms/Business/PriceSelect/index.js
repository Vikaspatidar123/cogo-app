import { Input, InputGroup } from '@cogoport/components';

import SelectCurrency from '../SelectCurrency';

function PriceSelect({
	onChange, disabled = false, currencyDisabled = false, value, priceKey,
	currencyKey, selectPlaceholder, placeholder, width = '70%', selectWidth,
}) {
	const handleChange = (selectedVal) => {
		onChange({
			[currencyKey] : selectedVal,
			[priceKey]    : value[priceKey],
		});
	};

	const handlePriceSelect = (val) => {
		const newVal =	typeof val === 'number' || typeof val === 'string'
			? val
			: val?.target?.value;
		onChange({
			[currencyKey] : value[currencyKey],
			[priceKey]    : newVal ? Number(newVal) : newVal,
		});
	};
	return (
		<InputGroup>
			<SelectCurrency
				disabled={currencyDisabled}
				onChange={handleChange}
				value={value?.[currencyKey]}
				placeholder={selectPlaceholder || 'INR'}
				width={selectWidth}
			/>
			<Input
				type="number"
				disabled={disabled}
				onChange={handlePriceSelect}
				placeholder={placeholder}
				style={{ width }}
			/>
		</InputGroup>
	);
}

export default PriceSelect;
