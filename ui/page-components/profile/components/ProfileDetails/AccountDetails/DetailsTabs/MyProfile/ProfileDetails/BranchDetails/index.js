import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function BranchDetails({ userDetails = {} }) {
	const { t } = useTranslation(['settings']);

	return (
		<div className={styles.wrapper}>
			<div className={styles.text_1}>
				{t('settings:branch_details_heading')}
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:branch_details_label_1')}</div>
						<div className={styles.value}>
							{userDetails?.branch?.branch_name ? userDetails?.branch?.branch_name : '-'}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>{t('settings:branch_details_label_2')}</div>
						<div className={styles.value}>
							{userDetails?.branch?.tax_number ? userDetails?.branch?.tax_number : '-'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BranchDetails;
