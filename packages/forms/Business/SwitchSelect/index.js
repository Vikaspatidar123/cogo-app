import { cl } from '@cogoport/components';
import React from 'react';

import Switch from '../Switch';

import styles from './styles.module.css';

function SwitchSelect({ children, switchProps, label }) {
	return (
		<div className={cl`${styles.container} switch-select-container`}>
			<div className={`switch-select-seperator ${styles.space_between}`}>
				<div className={styles.label}>{label}</div>
				<Switch {...switchProps} />
			</div>
			{children}
		</div>
	);
}
export default SwitchSelect;
