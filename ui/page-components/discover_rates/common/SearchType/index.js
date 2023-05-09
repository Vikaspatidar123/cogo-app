import { cl } from '@cogoport/components';
import React from 'react';

import MAPPING from '../../utils/icons';

import styles from './styles.module.css';

function SearchType({ search_type, theme, disabled, width }) {
	const mapped = MAPPING[search_type];
	if (!mapped) {
		return null;
	}
	return (
		<div
			className={cl`${styles.container} ${styles[theme]} ${
      	disabled ? styles.disabled : ''
			}`}
			width={width}
		>
			<mapped.icon />
			<div className={styles.tag}>{mapped.tag}</div>
		</div>
	);
}

export default SearchType;
