import { Textarea } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function TextAreaController({
	itemKey, name, value, control, ...rest
}) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Textarea
					style={{
						padding : '8px',
						resize  : 'none',
					}}
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}

export default TextAreaController;
