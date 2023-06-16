/* eslint-disable import/no-unresolved */
import { Select } from '@cogoport/components';

import countryCode from '@/.data-store/constants/countries.json';

function SelectCountryCode(props) {
	const { value } = props;

	const formattedList = countryCode.map((code) => ({
		id    : code.id,
		value : code.mobile_country_code,
		label : `${code.mobile_country_code || ''}: ${code.name || ''}`,
	}));

	return (
		<Select {...props} options={formattedList} value={value} readOnly={false} />
	);
}

export default SelectCountryCode;
