import { Chips } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function PillsController(props) {
	const {
		name, control, rules, ...rest
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
					onItemChange={onChange}
					selectedItems={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default PillsController;
