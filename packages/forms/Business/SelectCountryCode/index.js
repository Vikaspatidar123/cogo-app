/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { Select } from '@cogoport/components';

import countryCode from '@/.data-store/constants/countries.json';

function SelectCountryCode(props) {
	const { value } = props;

	const formattedList = countryCode.map((code) => ({
		value : code.mobile_country_code,
		label : (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span style={{ marginRight: '10px' }}>
					<img
						src={
              code.flag_icon_url
              	? code.flag_icon_url
              	: 'https://via.placeholder.com/24x20'
            }
						alt={code.name}
					/>
				</span>
				<span style={{ marginTop: -4 }}>
					{code.mobile_country_code}
					:
					{' '}
					{code.name}
				</span>
			</div>
		),
	}));

	return (
		<Select {...props} options={formattedList} value={value} readOnly={false} />
	);
}

export default SelectCountryCode;
