import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './style.module.css';

function CardHeader({ plans = {} }) {
	const planObjArray = Object.values(plans);

	const { t } = useTranslation(['subscriptions']);

	const sortPlanObjArray = (planObjArray || []).sort(
		(a, b) => (a?.priority_sequence || 0) - (b?.priority_sequence || 0),
	);

	return (
		<div className={cl`${styles.row} ${styles.header}`}>
			<div className={cl`${styles.col} ${styles.feature} ${styles.featureTitle}`} style={{ minWidth: '30%' }}>
				{t('subscriptions:feature_text')}
			</div>
			<div className={styles.plan_name}>
				{(sortPlanObjArray || []).map(({ display_name = '' }, index) => (
					<div
						className={cl`${styles.col} ${styles.planCol} ${styles[`planCol${index}`]}`}
						key={display_name}
						style={{ minWidth: '170px' }}
					>
						{display_name}
					</div>
				))}
			</div>
		</div>
	);
}

export default CardHeader;
