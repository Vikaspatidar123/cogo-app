import { Input } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputController(props) {
	const {
		name, control, value, rules, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Input
					{...rest}
					key={rest.id}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) {
							rest.handleChange(val, obj);
						}
					}}
					value={newValue}
					onBlur={(event) => {
						onBlur(event);
						rest?.handleBlur?.(event);
					}}
				/>
			)}
		/>
	);
}
export default InputController;
