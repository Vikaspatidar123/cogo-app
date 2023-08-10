import { CreatableMultiSelect } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function CreatableMultiSelectController(props) {
	const { name, control, rules, value, ...rest } = props;
	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<CreatableMultiSelect
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
export default CreatableMultiSelectController;
