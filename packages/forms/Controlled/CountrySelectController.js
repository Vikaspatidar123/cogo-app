import { Controller } from 'react-hook-form';

import SelectCountry from '../Business/SelectCountry';

function CountrySelectController({ name, itemKey, value, control, ...rest }) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<SelectCountry
					{...rest}
					key={itemKey}
					onChange={(val, obj) => {
						onChange(val, obj);

						if (rest?.handleChange) {
							rest?.handleChange(obj);
						}
					}}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}

export default CountrySelectController;
