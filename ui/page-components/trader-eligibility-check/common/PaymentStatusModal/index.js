import { Button, Modal, cl } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { PaymentIcon } from '../../configuration/icon-configuration';
import redirectUrl from '../../constants/redirectUrl';

import styles from './styles.module.css';

function PaymentStatusModal({
	paymentStatusModal = false,
	setPaymentStatusModal = () => {},
	stop = '',
	paymentStatus = '',
	checkLoading = false,
}) {
	setTimeout(() => {
		if (paymentStatus === 'PAID') {
			setPaymentStatusModal(false);
		}
	}, 3000);
	const { successUrl, pendingUrl } = redirectUrl();
	const closeModalHandler = () => {
		setPaymentStatusModal(false);
	};
	const [url, setUrl] = useState(pendingUrl);
	const [text, setText] = useState('Hang on! Checking payment status');
	useEffect(() => {
		if (!checkLoading && paymentStatus === 'PAID') {
			setTimeout(
				() => {
					setPaymentStatusModal(false);
				},
				2500,
				setUrl(successUrl),
				setText('Payment Successful!!!!'),
			);
		} else if (!checkLoading && paymentStatus === 'ERROR') {
			setText(
				`Ooopss!!! Something went wrong.We could not process
				your request right now. We will review this issue
				and get back to you in 24-48 hrs.`,
			);
		}
	}, [checkLoading, paymentStatus, setPaymentStatusModal, successUrl]);

	return (
		<Modal
			className="primary md"
			show={paymentStatusModal}
			onClose={closeModalHandler}
			closable
		>
			{!stop && (
				<div className={styles.container}>
					{paymentStatus === 'ERROR' ? (
						<img src={PaymentIcon} alt="" height="150px" width="150px" />
					) : (
						<img src={url} alt="" className={styles.image} />
					)}
					<div
						className={cl`${styles.title} ${
							paymentStatus === 'ERROR' && styles.noresult
						}`}
					>
						{text}
					</div>
				</div>
			)}
			{stop && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={cl`${styles.txt}${styles.error}`}>
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</div>
					<Button className="secondary sm text" onClick={closeModalHandler}>
						Close
					</Button>
				</div>
			)}
		</Modal>
	);
}
export default PaymentStatusModal;
