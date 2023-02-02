// eslint-disable-next-line import/no-unresolved
import Select from '@cogoport/business/form/components/Business/Select';

import countryCode from './countries.json';

function SelectCountryCode(props) {
	const { value } = props;

	const formattedList = countryCode.map((code) => ({
		value : code.mobile_country_code,
		label : `${code.mobile_country_code}: ${code.name}`,
	}));

	return (
		<Select {...props} options={formattedList} value={value} readOnly={false} />
	);
}

export default SelectCountryCode;
