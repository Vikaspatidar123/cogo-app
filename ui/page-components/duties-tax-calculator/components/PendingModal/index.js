import { Button, Modal, cl } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';

import { Loading, LoadingBanner } from '../../configuration/icon-configuration';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function PendingModal({ showPendingModal, setShowPendingModal, stop }) {
	const { query } = useRouter();
	const { org_id = '', branch_id = '' } = query || {};

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
					<div className={styles.title}>Hang on! Checking payment status...</div>
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
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</div>
					<Button themeType="linkUi" onClick={closeModalHandler}>
						Close
					</Button>
				</div>
			)}

		</Modal>
	);
}
export default PendingModal;
