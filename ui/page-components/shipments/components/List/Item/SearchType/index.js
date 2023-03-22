// import { getServiceInfo } from '@cogo/bookings/utils/getServiceInfo';
import React from 'react';

import displayNameMapping from '../../../../configurations/common/short-display-names.json';

import styles from './styles.module.css';
// import { Container, Tag, IconAndService } from './styles';

function SearchType({
	service_type = '',
	theme = '',
	disabled = false,
	width = null,
}) {
	// const { serviceIcon } = getServiceInfo({
	// 	service  : service_type,
	// 	showText : false,
	// });

	return (
		<div
			className={`${styles.container} ${styles.theme} ${disabled ? styles.disabled : ''}`}
		>
			{/* <IconAndService>{serviceIcon}</IconAndService> */}

			<div className={styles.tag}>{displayNameMapping[service_type]}</div>
		</div>
	);
}

export default SearchType;
