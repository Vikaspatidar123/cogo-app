import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ActivatePendingModal({ activateLoading }) {
	const { t } = useTranslation(['subscriptions']);
	return (
		<Modal show={activateLoading} closable={false}>
			<div className={styles.container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.loading_banner}
					alt={t('subscriptions:cogo_text')}
					width={300}
					height={200}
				/>
				<div className={styles.title}>{t('subscriptions:panding_message')}</div>
				<Image
					src={GLOBAL_CONSTANTS.image_url.loading}
					alt={t('subscriptions:cogo_text')}
					width={30}
					height={30}
				/>
			</div>
		</Modal>
	);
}

export default ActivatePendingModal;
