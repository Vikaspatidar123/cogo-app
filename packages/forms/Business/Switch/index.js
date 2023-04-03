import { Toggle } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function IncoTermSelect({ right, left, active, onChange, style, id }) {
	const onToggle = () => {
		if (active === left.value) {
			onChange(right.value);
		} else {
			onChange(left.value);
		}
	};

	return (
		<div className={styles.row} style={style}>
			<div
				className={left.value === active ? `${styles.active}${styles.trade_type}` : `${styles.trade_type}`}
			>
				{left.title}

			</div>
			<Toggle
				className={styles.styled_toggle}
				onChange={onToggle}
				value={active === right.value}
				id={`${id || 'switch'}_toggle`}
			/>
			<div
				className={left.value === active ? `${styles.active}${styles.trade_type}` : `${styles.trade_type}`}
			>
				{right.title}

			</div>
		</div>
	);
}

export default IncoTermSelect;
