import { Radio } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function RadioController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Radio
					{...rest}
					key={rest.id}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) {
							rest.handleChange(val, obj);
						}
					}}
					value={newValue || value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default RadioController;
