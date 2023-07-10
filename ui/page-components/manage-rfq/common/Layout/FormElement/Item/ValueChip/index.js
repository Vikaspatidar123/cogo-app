import { Button } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ValueChip({ value = '', onCancel = () => {}, name = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>{value}</div>
			<Button
				onClick={onCancel}
				id={`search_form_${name}_clear_btn`}
				className={styles.value_chip}
			>
				<IcMCrossInCircle className={styles.cross_icon} />
			</Button>
		</div>
	);
}

export default ValueChip;
