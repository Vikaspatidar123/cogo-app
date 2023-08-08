import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingRateCard() {
	return ([...Array(3)].map(() => (
		<div className={styles.container}>
			<div className={styles.heading}>
				<Placeholder className={styles.loader} height="30px" width="100px" />
				<Placeholder className={styles.loader} height="30px" width="100px" />
			</div>
			<div className={styles.info_wrapper}>
				<div>
					<Placeholder className={styles.loader} height="60px" width="300px" />
				</div>
				<div>
					<Placeholder className={styles.loader} height="60px" width="300px" />
				</div>
			</div>
		</div>
	))
	);
}

export default LoadingRateCard;
