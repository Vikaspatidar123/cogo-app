/* eslint-disable import/no-unresolved */
import { Select } from '@cogoport/components';
import { Controller } from 'react-hook-form';

// import SelectCountry from '../Business/SelectCountry';

import countryCode from '@/.data-store/constants/countries.json';

function CountrySelectController({ name, itemKey, value, control, ...rest }) {
	const formattedList = countryCode.map((code) => ({
		id    : code.id,
		// value : code.mobile_country_code,
		value : code.id,
		label : code.name,
		// label : (
		// 	<div style={{ display: 'flex', alignItems: 'center' }}>
		// 		<img src={code?.flag_icon_url} alt={code?.name} style={{ marginRight: '4px' }} />
		// 		{code.name}
		// 	</div>
		// ),
	}));

	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			// shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Select
					// option
					{...rest}
					key={itemKey}
					// onChange={onChange}
					options={formattedList}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest?.handleChange) {
							rest?.handleChange(obj);
						}
					}}
					value={newValue || value}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}

export default CountrySelectController;
