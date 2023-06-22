import { Button } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ValueChip({ value, onCancel, style, id, disabled = false }) {
	return (
		<div className={styles.container} style={style}>
			<div className={styles.text}>{value}</div>
			{!disabled ? (
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
					<IcMCrossInCircle style={{ width: 20, height: 20 }} fill="#000" />
				</Button>
			) : null}
		</div>
	);
}

export default ValueChip;
