import { cl, Button, Modal } from '@cogoport/components';
import { IcMInformation, IcMAlert } from '@cogoport/icons-react';

import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const hsCodeWarning = ({ setShowPendingModal, withHsHandler, handleSubmit }) => (
	<div className={styles.container}>
		<IcMAlert fill="#FBDC00" width={45} height={45} />
		<div className={styles.title}>You didnt enter the Hs Code</div>
		<div className={styles.text}>
			HS codes can provide greater transparency and clarity on the required
			documentation for the combination of your cargo and destination countries
		</div>
		<div className={styles.btn_container}>
			<Button size="sm" themeType="secondary" onClick={() => setShowPendingModal(false)}>
				Close
			</Button>
			<Button className={styles.submit_btn} themeType="accent" size="sm" onClick={handleSubmit(withHsHandler)}>
				Procced
			</Button>
		</div>
	</div>
);

function PendingModal({
	showPendingModal,
	setShowPendingModal,
	stop,
	watchHsCode = '',
	withHsHandler = () => {},
	handleSubmit = () => {},
}) {
	const { query } = useRouter();
	const { org_id = '', branch_id = '' } = query || {};

	const closeModalHandler = () => {
		// eslint-disable-next-line max-len
		const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}app/${org_id}/${branch_id}/saas/premium-services/import-export-doc`;
		window.open(redirectUrl, '_self');
		setShowPendingModal(false);
	};
	return (
		<Modal show={showPendingModal} closable={false}>
			{watchHsCode ? (
				<>

					{!stop && (
						<div className={styles.container}>
							<img src={iconUrl.loadingBanner} alt="loading.." className="loading_banner" />
							<div className={styles.title}>Hang on! Checking payment status...</div>
							<img src={iconUrl.loading} alt="loading" className={styles.loading} />
						</div>
					)}

					{stop && (
						<div className={styles.container}>
							<IcMInformation fill="#FBDC00" width={52} height={52} />
							<div className={cl`${styles.text} ${styles.error}`}>
								Sorry, It took longer than usual. We will notify you once payment is
								successful
							</div>
							<Button themeType="secondary" onClick={closeModalHandler}>
								Close
							</Button>
						</div>
					)}
				</>
			) : (
				hsCodeWarning({ withHsHandler, setShowPendingModal, handleSubmit })
			)}
		</Modal>
	);
}
export default PendingModal;
