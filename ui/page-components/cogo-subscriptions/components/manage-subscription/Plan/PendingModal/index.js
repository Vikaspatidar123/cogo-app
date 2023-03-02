/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useEffect } from 'react';
import styles from './styles.module.css';

function PendingModal({
	razorLoading,
	paymentStatus,
	setRazorLoading,
	apiTries,
	setAddModal,
}) {
	const { status = '' } = paymentStatus || {};

	const closeModalHandler = () => {
		setRazorLoading(false);
	};
	useEffect(() => {
		if (apiTries < 10 && status === 'active') {
			setAddModal(true);
			setRazorLoading(false);
		}
		if (apiTries > 10) {
			setTimeout(() => {
				closeModalHandler();
			}, 10000);
		}
	}, [apiTries, status]);

	return (
		<Modal
			size="md"
			placement="top"
			className="primary md"
			show={razorLoading}
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			{apiTries < 10 && status !== 'active' && (
				<div className={styles.container}>
					<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-banner.svg' alt='cogo'/>
					<div className={styles.title}> Hang on! Checking payment status...</div>
					<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg' alt='cogo' />
				</div>
			)}

			{apiTries > 9 && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={`${styles.txt} ${styles.error}`}>
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</div>
					<Button size="md" themeType="secondary" onClick={closeModalHandler}>
						Close
					</Button>
				</div>
			)}
		</Modal>
	);
}

export default PendingModal;
