import { Select } from '@cogoport/components';

// eslint-disable-next-line import/no-unresolved
import countryCode from '@/.data-store/constants/countries.json';

function SelectCountryCode(props) {
	const { value } = props;

	const formattedList = countryCode.map((code) => ({
		id    : code.id,
		value : code.mobile_country_code,
		label : (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img src={code?.flag_icon_url} alt={code?.name} style={{ marginRight: '4px' }} />
				{code.name}
			</div>
		),
	}));

	return (
		<Select {...props} options={formattedList} value={value} />
	);
}

export default SelectCountryCode;
