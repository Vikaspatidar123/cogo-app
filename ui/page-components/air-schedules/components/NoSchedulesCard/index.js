import React from 'react';

import styles from './styles.module.css';

function NoSchedulesCard({ loading }) {
	return (
		<div className={styles.card}>
			{!loading && (
				<>
					<img
						alt=""
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
						height={200}
						width={300}
					/>
					No Schedules Found
				</>
			)}
		</div>
	);
}

export default NoSchedulesCard;
