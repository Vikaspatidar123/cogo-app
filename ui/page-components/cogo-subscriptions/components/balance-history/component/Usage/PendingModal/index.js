import { Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useCallback, useEffect } from 'react';

import redirectUrl from '../../../../../utils/redirectUrl';

import styles from './styles.module.css';

function PendingModal({
	pendingModal,
	setPendingModal,
	paymentStatus,
	setRazorLoading,
	apiTries,
	quantity,
	name,
	setAddModal,
}) {
	const { status = '' } = paymentStatus || {};
	const { redirectBalanceHistory } = redirectUrl();

	const closeModalHandler = useCallback(() => {
		setPendingModal(false);
		setRazorLoading(false);
		redirectBalanceHistory();
		setAddModal(false);
	}, [redirectBalanceHistory, setAddModal, setPendingModal, setRazorLoading]);

	useEffect(() => {
		if (apiTries > 10) {
			setTimeout(() => {
				closeModalHandler();
			}, 10000);
		}
	}, [apiTries, closeModalHandler]);

	useEffect(() => {
		if (status === 'active') {
			setTimeout(() => {
				closeModalHandler();
			}, 10000);
		}
	}, [closeModalHandler, status]);

	return (
		<Modal
			className="primary md"
			show={pendingModal}
			closable={apiTries < 10 && status === 'active'}
			onClose={closeModalHandler}
		>
			{apiTries < 10 && status !== 'active' && (
				<div className={styles.container}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-banner.svg" alt="cogo" />
					<div className={styles.title}>Hang on! Checking payment status...</div>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg" alt="cogo" />
				</div>
			)}
			{apiTries < 10 && status === 'active' && (
				<div className={styles.container}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/success.svg" alt="cogo" />
					<div className={styles.title}>Congratulations !</div>
					<div className={styles.txt}>
						{`Successfully added ${quantity} ${name}`}
						{' '}
					</div>
				</div>
			)}

			{apiTries > 9 && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={`${styles.txt} ${styles.error}`}>
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</div>
					<Button size="sm" themeType="secondary" onClick={closeModalHandler}>
						Close
					</Button>
				</div>
			)}
		</Modal>
	);
}

export default PendingModal;
