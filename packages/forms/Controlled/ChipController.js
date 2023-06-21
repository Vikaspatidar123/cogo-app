import { Chips } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

import getOptionsFromKey from '../Business/Select/getOptionsFromKey';

function ChipsController(props) {
	const {
		name, control, rules, optionKey, options, disabled = false, value, ...rest
	} = props;
	const data = getOptionsFromKey(optionKey, { ...rest });
	const optionDate = data?.options.map((item) => ({
		...item,
		key: item.value,
		children: item.label,
		disabled,
	})) || options.map((item) => ({ ...item, disabled }));

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Chips
					{...rest}
					key={rest.id}
					items={optionDate}
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
