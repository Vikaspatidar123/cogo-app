import React from 'react';

import styles from './styles.module.css';

function Item({ location, search_type }) {
	const splitDisplayName = (location.display_name || '').split(',');

	let info = (location.country || {}).name
    || splitDisplayName[splitDisplayName?.length - 1]
    || '';

	if (
		search_type === 'fcl_freight'
    || search_type === 'air_freight'
    || search_type === 'fcl_customs'
    || search_type === 'fcl_cfs'
    || search_type === 'air_customs'
	) {
		info = `${location.port_code}, ${info}`;
	}

	return (
		<div className={styles.container}>
			<div className={styles.info}>{info}</div>
			<div className={styles.name}>{location.name || ''}</div>
		</div>
	);
}

export default Item;
