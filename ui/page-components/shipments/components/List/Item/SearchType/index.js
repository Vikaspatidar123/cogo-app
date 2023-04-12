import React from 'react';

import displayNameMapping from '../../../../configurations/common/short-display-names.json';

import { GetServiceIcon } from './GetServiceIcon';
import styles from './styles.module.css';

function SearchType({
	service_type = '',
	theme = '',
	disabled = false,
}) {
	const { serviceIcon } = GetServiceIcon({
		service  : service_type,
		showText : false,
	});
	return (
		<div
			className={`${styles.container} ${styles?.[theme]} ${disabled ? styles.disabled : ''}`}
		>
			<div className={styles.icon_service}>{serviceIcon}</div>

			<div className={styles.tag}>{displayNameMapping[service_type]}</div>
		</div>
	);
}

export default SearchType;
