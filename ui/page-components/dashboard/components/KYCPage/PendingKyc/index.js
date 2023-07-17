import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PendingKyc() {
	const { t } = useTranslation(['dashboard']);

	return (
		<>
			<Image
				className={styles.image1}
				src={GLOBAL_CONSTANTS.image_url.pen_image}
				alt={t('dashboard:header_text_1')}
				width={50}
				height={20}
			/>
			<div className={cl`${styles.image2} ${styles.kyc}`}>
				{t('dashboard:kycStatus_text_3')}
			</div>
		</>
	);
}

export default PendingKyc;
