import { CreatableSelect, Select } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function AsyncSelectController({
	itemKey,
	name,
	value,
	control,
	id,
	type = '',
	...rest
}) {
	const Element = type === 'creatable-select' ? CreatableSelect : Select;
	return (
		<Controller
			key={itemKey || name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onBlur, onChange, value: newValue } }) => (
				<Element
					key={itemKey}
					value={newValue || value}
					onChange={(val, obj) => onChange(val, obj)}
					onBlur={onBlur}
					inputId={id || name}
					{...rest}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
