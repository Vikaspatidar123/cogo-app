import { Button, Modal, cl } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import { Loading, LoadingBanner } from '../../configuration/icon-configuration';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

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
						src={LoadingBanner}
						alt=""
						className={styles.loading_banner}
					/>
					<div className={styles.title}>{t('dutiesTaxesCalculator:pending_modal_checking')}</div>
					<img
						src={Loading}
						alt=""
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
					<Button themeType="linkUi" onClick={closeModalHandler}>
						{t('common:close')}
					</Button>
				</div>
			)}

		</Modal>
	);
}
export default PendingModal;
