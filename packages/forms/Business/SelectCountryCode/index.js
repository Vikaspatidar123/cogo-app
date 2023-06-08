/* eslint-disable import/no-unresolved */
import { Select } from '@cogoport/components';
import Image from 'next/image';

import countryCode from '@/.data-store/constants/countries.json';

function SelectCountryCode(props) {
	const { value, showCountryName = true, height = 18, width = 18 } = props;

	const formattedList = countryCode.map((code) => ({
		value : code.mobile_country_code,
		label : (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span style={{ marginRight: '5px' }}>
					<Image
						width={width}
						height={height}
						src={code.flag_icon_url ? code.flag_icon_url : 'https://via.placeholder.com/24x20'}
						alt={code.name}
					/>
				</span>
				<span style={{ marginTop: -4 }}>
					{code.mobile_country_code}
					{showCountryName && `: ${code.name}`}
				</span>
			</div>
		),
	}));

	return (
		<Select {...props} options={formattedList} value={value} readOnly={false} />
	);
}

export default SelectCountryCode;
