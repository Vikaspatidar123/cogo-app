import { Input } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputController({
	itemKey, name, value, control, theme, ...rest
}) {
	let Element = Input;
	if (theme === 'admin') {
		Element = Input;
	}
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Element
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={(event) => {
						onBlur(event);
						rest?.onBlur?.(event);
					}}
					data-test-value={newValue}
				/>
			)}
		/>
	);
}
export default InputController;
