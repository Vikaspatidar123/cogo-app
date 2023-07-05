import { cl, Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import iconUrl from '../../utils/iconUrl.json';

import SameHsCode from './SameHsCode';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function PendingModal({
	showPendingModal,
	setShowPendingModal,
	stop = false,
	btnSubtmitHandler,
}) {
	const { query = {}, billId = '' } = useRouter();
	const { org_id = '', branch_id = '' } = query || {};

	const { t } = useTranslation(['close', 'importExportControls']);

	const closeModalHandler = () => {
		// eslint-disable-next-line max-len
		const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}/saas/premium-services/import-export-controls`;
		window.open(redirectUrl, '_self');
		setShowPendingModal(false);
	};

	return (
		<Modal className="primary md" show={showPendingModal} closable={false}>
			{billId ? (
				<>
					{!stop && (
						<div className={styles.container}>
							<img
								src={iconUrl.loadingBanner}
								alt={t('importExportControls:loading')}
								className={styles.loading_banner}
							/>
							<div className={styles.title}>{t('importExportControls:pending_modal_waiting')}</div>
							<img src={iconUrl.loading} alt="loading" className={styles.loading} />
						</div>
					)}
					{stop && (
						<div className={styles.container}>
							<IcMInformation fill="#FBDC00" width={52} height={52} />
							<div className={cl`${styles.text} ${styles.error}`}>
								{t('importExportControls:pending_modal_failed')}
							</div>
							<Button themeType="linkUI" onClick={closeModalHandler}>
								{t('common:close')}
							</Button>
						</div>
					)}
				</>
			) : (
				<SameHsCode
					setShowPendingModal={setShowPendingModal}
					btnSubtmitHandler={btnSubtmitHandler}
				/>
			)}
		</Modal>
	);
}
export default PendingModal;
