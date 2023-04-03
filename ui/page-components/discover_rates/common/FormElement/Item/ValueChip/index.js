import { Button } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ValueChip({ value, onCancel, style, name }) {
	return (
		<div className={styles.container} style={style}>
			<div className={styles.text}>{value}</div>
			<Button
				onClick={onCancel}
				id={`search_form_${name}_clear_btn`}
				style={{
					padding    : 0,
					background : 'transparent',
					marginLeft : 1,
					height     : 24,
					width      : 24,
					border     : 'none',
				}}
			>
				<IcMCrossInCircle onClick={() => onCancel()} width={18} height={18} fill="black" />
			</Button>
		</div>
	);
}

export default ValueChip;
