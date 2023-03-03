import { Select } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function SelectController({
	itemKey, name, value, size = 'md', control, ...rest
}) {
	return (
		<Controller
			key={itemKey || name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Select
					{...rest}
					key={itemKey}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) {
							rest.handleChange(obj, name);
						}
					}}
					value={newValue || value}
					onBlur={onBlur}
					size={size}
				/>
			)}
		/>
	);
}

export default SelectController;
