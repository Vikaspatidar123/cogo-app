import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SCHEDULE_TYPE_MAPPING = {
	transshipment : 'Trans-shipment',
	direct        : 'Direct',
};

export function FclTags({ data }) {
	return (
		<div className={styles.text_wrapper}>
			{data?.payment_term ? (
				<div>
					<div className={`${styles.wrapper} ${styles.payment_term}`}>
						<div className={styles.text}>
							{' '}
							{startCase(data.payment_term)}
						</div>
					</div>
				</div>
			) : null}

			{data?.schedule_type ? (
				<div>
					<div className={styles.wrapper}>
						<div className={`${styles.text} ${styles.schedule_type}`}>
							{' '}
							{SCHEDULE_TYPE_MAPPING[data.schedule_type]
									|| startCase(data.schedule_type)}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
