import { IcCFtick, IcCFcrossInCircle, IcCError } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function KycStatus({ kyc_status }) {
	const { t } = useTranslation(['common']);
	return (
		<div className={styles.container}>
			{kyc_status === 'verified' && (
				<>
					<div className={styles.kyc_verified}>{t('common:kyc_verified')}</div>
					<IcCFtick width={15} height={15} />
				</>
			)}

			{kyc_status === 'rejected' && (
				<>
					<div className={styles.label}>{t('common:kyc_rejected')}</div>
					<IcCFcrossInCircle width={15} height={15} />
				</>
			)}

			{['pending_from_user', 'pending_verification'].includes(kyc_status) && (
				<>
					<div className={styles.kyc_pending}>{t('common:kyc_pending')}</div>
					<IcCError width={15} height={15} />
				</>
			)}
		</div>
	);
}

export default KycStatus;
