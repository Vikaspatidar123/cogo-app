import { cl, Button, Modal } from '@cogoport/components';
import { IcMInformation, IcMAlert } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function HsCodeWarning({ setShowPendingModal, withHsHandler, handleSubmit }) {
	const { t } = useTranslation(['common', 'importExportDoc']);

	return (
		<div className={styles.container}>
			<IcMAlert fill="#FBDC00" width={45} height={45} />
			<div className={styles.title}>{t('importExportDoc:hscode_title')}</div>
			<div className={styles.text}>
				{t('importExportDoc:hscode_subtitle')}
			</div>
			<div className={styles.btn_container}>
				<Button
					size="sm"
					themeType="secondary"
					type="button"
					onClick={() => setShowPendingModal(false)}
				>
					{t('common:close')}
				</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					size="sm"
					type="button"
					onClick={handleSubmit(withHsHandler)}
				>
					{t('common:proceed')}
				</Button>
			</div>
		</div>
	);
}

function PendingModal({
	showPendingModal,
	setShowPendingModal,
	stop,
	watchHsCode = '',
	withHsHandler = () => { },
	handleSubmit = () => { },
}) {
	const { query } = useRouter();
	const { org_id = '', branch_id = '' } = query || {};

	const { t } = useTranslation(['common', 'importExportDoc']);

	const closeModalHandler = () => {
		const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}`
			+ '/saas/premium-services/import-export-doc';
		window.open(redirectUrl, '_self');
		setShowPendingModal(false);
	};
	return (
		<Modal show={showPendingModal} closable={false}>
			{watchHsCode ? (
				<>

					{!stop && (
						<div className={styles.container}>
							<img
								src={iconUrl.loadingBanner}
								alt={t('importExportDoc:loading')}
								className={styles.loading_banner}
							/>
							<div className={styles.title}>{t('importExportDoc:pending_modal_waiting')}</div>
							<img src={iconUrl.loading} alt={t('importExportDoc:loading')} className={styles.loading} />
						</div>
					)}

					{stop && (
						<div className={styles.container}>
							<IcMInformation fill="#FBDC00" width={52} height={52} />
							<div className={cl`${styles.text} ${styles.error}`}>
								{t('importExportDoc:pending_modal_failed')}
							</div>
							<Button themeType="secondary" onClick={closeModalHandler}>
								{t('importExportDoc:close')}
							</Button>
						</div>
					)}
				</>
			) : (
				<HsCodeWarning
					withHsHandler={withHsHandler}
					setShowPendingModal={setShowPendingModal}
					handleSubmit={handleSubmit}
				/>
			)}
		</Modal>
	);
}
export default PendingModal;
