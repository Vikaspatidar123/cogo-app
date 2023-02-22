import { Select } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

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
					onChange={(e, obj) => {
						onChange(e, obj);
						if (rest?.handleChange) {
							rest?.handleChange(obj);
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
export default SelectController;
