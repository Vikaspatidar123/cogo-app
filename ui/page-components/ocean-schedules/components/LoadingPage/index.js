import { Loader } from '@cogoport/components';
import React from 'react';

import ProgressCircle from '../../common/ProgressCircle';

import styles from './styles.module.css';

function LoadingPage({
	MAX_TIME,
	timeRemaining,
}) {
	return (
		<div className={styles.main_container}>
			<div className={styles.flex_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-ban.svg"
					alt=""
					style={{ width: 300, height: 'auto' }}
				/>
				<div className={styles.text}>Retrieving Schedule Data</div>
				<Loader themeType="primary" style={{ width: 40, height: 'auto', marginBottom: 5 }} />
				<div className={styles.text2}>
					{timeRemaining > 0
						? `Usually takes around ${MAX_TIME} seconds`
						: "Fetching data is taking longer than usual. We will inform you as soon as it's available."}
				</div>
				{timeRemaining > 0 ? (
					<div className={styles.progress_container}>
						<ProgressCircle
							radius={40}
							stroke={4}
							progress={100 - (timeRemaining / MAX_TIME) * 100}
							progressColor="#C4C4C4"
							backgroundColor="#8DC2F9"
						/>
						<p>{timeRemaining}</p>
					</div>
				) : (
					<div className={styles.no_schedule_text}>
						But don’t worry. schedule keeps fetching updates automatically. Check back in
						later and we might have the report ready for you.
					</div>
				)}
			</div>
		</div>
	);
}

export default LoadingPage;
