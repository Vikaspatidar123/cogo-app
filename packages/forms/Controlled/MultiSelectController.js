import { MultiSelect } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function MultiSelectController(props) {
	const {
		name, control, value, rules, ...rest
	} = props;
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value:newValue } }) => (
				<MultiSelect
					{...rest}
					name={name}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default MultiSelectController;
