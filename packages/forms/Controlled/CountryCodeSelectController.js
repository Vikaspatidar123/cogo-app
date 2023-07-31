import { Controller } from 'react-hook-form';

import SelectCountryCode from '../Business/SelectCountryCode';

function CountryCodeSelectController({
	name,
	itemKey,
	value,
	control,
	...rest
}) {
	return (
		
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<SelectCountryCode
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}

export default CountryCodeSelectController;
