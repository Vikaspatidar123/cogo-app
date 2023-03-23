import { Button } from '@cogoport/components';
import React from 'react';

import IcClear from './ic-clear.svg';
import styles from './styles.module.css';

function ValueChip({ value, onCancel, style, id }) {
	return (
		<div className={styles.container} style={style}>
			<div className={styles.text}>{value}</div>
			<Button
				ghost
				id={id}
				onClick={onCancel}
				style={{
					padding    : 0,
					background : 'transparent',
					marginLeft : 1,
					height     : 24,
					width      : 24,
					border     : 'none',
				}}
			>
				<IcClear style={{ width: 24, height: 24 }} />
			</Button>
		</div>
	);
}

export default ValueChip;
