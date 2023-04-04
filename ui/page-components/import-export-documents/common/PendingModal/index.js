import { Button, Modal } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useRouter } from 'next/router';

import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

function PendingModal({ showPendingModal, setShowPendingModal, stop }) {
	const { query } = useRouter();
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const closeModalHandler = () => {
		// eslint-disable-next-line max-len
		const redirectUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/import-export-doc`;
		window.open(redirectUrl, '_self');
		setShowPendingModal(false);
	};
	return (
		<Modal show={showPendingModal} closable={false}>
			{!stop && (
				<div className={styles.container}>
					<img src={iconUrl.loadingBanner} alt="loading.." className="loading_banner" />
					<div className={styles.title}>Hang on! Checking payment status...</div>
					<img src={iconUrl.loading} alt="loading" className="loading" />
				</div>
			)}

			{stop && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={styles.text}>
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</div>
					<Button themeType="secondary" onClick={closeModalHandler}>
						Close
					</Button>
				</div>
			)}
		</Modal>
	);
}
export default PendingModal;
