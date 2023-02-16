import React from 'react';
import { Controller } from 'react-hook-form';

import LegendInput from './index';

function LegendInputController({
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
				<LegendInput
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
					label={rest.label}
				/>
			)}
		/>
	);
}
export default LegendInputController;
