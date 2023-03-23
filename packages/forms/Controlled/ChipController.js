import { Chips } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function ChipsController(props) {
	const {
		name, control, rules, options, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<Chips
					{...rest}
					key={rest.id}
					items={options}
					onItemChange={onChange}
					selectedItems={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default ChipsController;
