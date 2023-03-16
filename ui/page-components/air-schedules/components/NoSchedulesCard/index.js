import React from 'react';

import styles from './styles.module.css';

function NoSchedulesCard() {
	return (
		<div className={styles.card}>
			<img
				alt=""
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
				height={200}
				width={200}
			/>
			No Schedules Found
		</div>
	);
}

export default NoSchedulesCard;
