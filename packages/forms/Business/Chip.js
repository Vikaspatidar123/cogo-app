import { Chips } from '@cogoport/components';
import React, { forwardRef } from 'react';

import getOptionsFromKey from './Select/getOptionsFromKey';

function Chip(props, ref) {
	const {
		options = [],
		optionKey,
		name,
		multiple,
		width,
		value: valueProp,
		onChange,
		...rest
	} = props;
	const data = getOptionsFromKey(
		optionKey,
		{ ...rest },
	);
	const optionDate = data?.options.map((item) => ({ ...item, key: item.value, children: item.label })) || options;

	const finalOptions = [...options, ...optionDate];
	return (
		<Chips
			{...rest}
			ref={ref}
			name={name}
			onItemChange={onChange}
			selectedItems={valueProp}
			items={finalOptions}
			multiple={multiple}
		/>
	);
}

export default forwardRef(Chip);
