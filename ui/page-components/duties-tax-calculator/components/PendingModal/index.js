import { Button, Modal, cl } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PendingModal({ showPendingModal, setShowPendingModal, stop }) {
	const { query } = useRouter();
	const { org_id = '', branch_id = '' } = query || {};

	const { t } = useTranslation(['common', 'dutiesTaxesCalculator']);

	const closeModalHandler = () => {
		const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}`
		+ '/saas/premium-services/duties-taxes-calculator';
		window.open(redirectUrl, '_self');
		setShowPendingModal(false);
	};
	return (
		<Modal show={showPendingModal} showCloseIcon={false}>
			{!stop && (
				<div className={styles.container}>
					<img
						src={GLOBAL_CONSTANTS.image_url.loading_banner}
						alt={t('dutiesTaxesCalculator:alt_loader')}
						className={styles.loading_banner}
					/>
					<div className={styles.title}>{t('dutiesTaxesCalculator:pending_modal_checking')}</div>
					<img
						src={GLOBAL_CONSTANTS.image_url.loading}
						alt={t('dutiesTaxesCalculator:alt_loader')}
						className={styles.loading}
					/>
				</div>
			)}

			{stop && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={cl`${styles.txt} ${styles.error}`}>
						{t('dutiesTaxesCalculator:pending_modal_failed')}
					</div>
					<Button themeType="linkUi" type="button" onClick={closeModalHandler}>
						{t('common:close')}
					</Button>
				</div>
			)}

		</Modal>
	);
}
export default PendingModal;
