import React from 'react';
import { Controller } from 'react-hook-form';

import Select from '../Business/Select';

function SelectController(props) {
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
				<Select
					{...rest}
					key={rest.id}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) {
							rest.handleChange(obj, name);
						}
					}}
					value={newValue}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default SelectController;
