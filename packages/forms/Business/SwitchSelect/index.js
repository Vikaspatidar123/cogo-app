import React from 'react';

import Switch from '../Switch';

import styles from './styles.module.css';

function SwitchSelect({ children, switchProps, label }) {
	return (
		<div className={styles.container} id="switch-select-container">
			<div className={styles.space_between}>
				<div className={styles.label}>{label}</div>
				<Switch {...switchProps} />
			</div>
			{children}
		</div>
	);
}
export default SwitchSelect;
