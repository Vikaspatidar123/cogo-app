import { Button, Modal } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';

import iconUrl from '../../../utils/iconUrl.json';
import redirectUrl from '../../../utils/redirectUrl';

import styles from './styles.module.css';

function PendingModal({ pendingModal, setPendingModal, pendingStatus }) {
	const { redirectViewQuote } = redirectUrl();
	const closeModalHandler = () => {
		setPendingModal(false);
		redirectViewQuote();
	};
	return (
		<Modal show={pendingModal}>
			{!pendingStatus && (
				<div className={styles.container}>
					<img src={iconUrl.loadingBanner} alt="loading" className={styles.loading_banner} />
					<div className={styles.title}>Hang on! Checking payment status...</div>
					<img src={iconUrl.loading} alt="loading" className={styles.icon_tridot} />
				</div>
			)}

			{pendingStatus && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={styles.text}>
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</div>
					<Button onClick={closeModalHandler}>
						Close
					</Button>
				</div>
			)}
		</Modal>
	);
}
export default PendingModal;
