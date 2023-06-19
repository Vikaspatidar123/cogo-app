import React from 'react';

import styles from './styles.module.css';

function NoSchedulesCard({ loading }) {
	return (
		<>
			{!loading && (
				<div className={styles.card}>
					<img
						alt=""
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
						height={200}
						width={300}
					/>
					No Schedules Found
				</div>
			)}
		</>
	);
}

export default NoSchedulesCard;
