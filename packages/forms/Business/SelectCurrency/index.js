import { Select } from '@cogoport/components';

import options from '../../constants/currencies';

function SelectCurrency({ value, onChange, width = '30%', ...rest }) {
	const handleChange = (selectedVal, object) => {
		onChange(selectedVal, object);
	};
	return (
		<Select
			{...rest}
			options={options}
			value={value}
			onChange={handleChange}
			valueKey="value"
			labelKey="label"
			style={{ width }}
		/>
	);
}

export default SelectCurrency;
