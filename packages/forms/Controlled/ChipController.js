import { Chips } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

import getOptionsFromKey from '../Business/Select/getOptionsFromKey';

function ChipsController(props) {
	const { name, control, rules, optionKey, options, value, ...rest } = props;
	const data = getOptionsFromKey(optionKey, { ...rest });

	const optionData = data?.options.map((item) => ({
		...item,
		key      : item.value,
		children : item.label,
	})) || options;
	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value:newValue } }) => (
				<Chips
					{...rest}
					key={rest.id}
					items={optionData}
					onItemChange={(val) => {
						onChange(val);
						if (rest?.onChange) {
							rest.onChange(val);
						}
					}}
					selectedItems={newValue}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default ChipsController;
