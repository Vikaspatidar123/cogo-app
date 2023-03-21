import { Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { successUrl, pendingUrl } from '../constants';
import redirectUrl from '../redirectUrl';

import styles from './styles.module.css';

function PendingModal({ pendingModal, setModal, stop, paymentStatus, checkLoading }) {
	const { redirectList } = redirectUrl();

	const closeModalHandler = () => {
		redirectList();
		setModal((prev) => ({
			...prev,
			pendingModal: false,
		}));
	};

	const [url, setUrl] = useState(pendingUrl);
	const [text, setText] = useState('Hang on! Checking payment status');
	useEffect(() => {
		if (!checkLoading && paymentStatus === 'PAID') {
			setUrl(successUrl);
			setText('Payment Successful!!!!');
		} else if (!checkLoading && paymentStatus === 'ERROR') {
			setText(
				`Ooopss!!! Something went wrong.We could not 
                process your request right now. We will review this issue and get back to you in 24-48 hrs.
				If you have any queries,please contact us on, Mobile Number:9969279848,
                 7282872743, Email: romil.shah@cogoport.com`,
			);
		}
	}, [paymentStatus, checkLoading]);

	return (
		<Modal className="primary md" show={pendingModal} closable={false}>
			{!stop && (
				<div className={styles.container}>
					{paymentStatus === 'ERROR' ? (
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/payment.svg"
							height="150px"
							width="150px"
							alt=""
						/>
					) : (
						<img src={url} alt="" width="100px" height="100px" />
					)}
					<div className={paymentStatus === 'ERROR' ? 'noresult' : 'title'}>{text}</div>
				</div>
			)}
			{stop && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={styles.error}>
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
