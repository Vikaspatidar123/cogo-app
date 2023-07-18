import { IcCFcrossInCircle } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

function RejectedKyc({ kyc_rejection_reason }) {
	const { t } = useTranslation(['dashboard']);

	return (
		<>
			<IcCFcrossInCircle width={34} height={34} />
			<div className={styles.status_text}>
				{t('dashboard:kycStatus_text_9')}
			</div>
			<div className={styles.image2}>
				{kyc_rejection_reason}
			</div>
		</>
	);
}
export default RejectedKyc;
