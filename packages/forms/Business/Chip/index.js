import { Chips } from '@cogoport/components';
import React, { forwardRef } from 'react';

import getOptionsFromKey from '../Select/getOptionsFromKey';

import styles from './styles.module.css';

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
	const data = getOptionsFromKey(optionKey, { ...rest });
	const optionDate = data?.options?.map((item) => ({
		...item,
		key      : item.value,
		children : item.label,
	})) || options;
	return (
		<div className={styles.animated_container}>
			<Chips
				{...rest}
				ref={ref}
				name={name}
				onItemChange={onChange}
				selectedItems={valueProp}
				items={optionDate}
				multiple={multiple}
			/>
		</div>
	);
}

export default forwardRef(Chip);
