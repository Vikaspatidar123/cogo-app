import { Slider } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function SliderController({
	itemKey,
	control,
	name,
	value,
	min,
	max,
	...rest
}) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			render={({ field: { onChange, value: newValue } }) => (
				<Slider min={min} max={max} value={newValue} onChange={onChange} />
			)}
		/>
	);
}
export default SliderController;
