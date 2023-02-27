/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useEffect } from 'react';

import LoadingBanner from '../../../../../asset/loading-banner.svg';
import IconTridot from '../../../../../asset/loading.svg';
import SuccessSvg from '../../../../../asset/success.svg';
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

	const closeModalHandler = () => {
		setPendingModal(false);
		setRazorLoading(false);
		redirectBalanceHistory();
		setAddModal(false);
	};
	useEffect(() => {
		if (apiTries > 10) {
			setTimeout(() => {
				closeModalHandler();
			}, 10000);
		}
	}, [apiTries]);

	useEffect(() => {
		if (status === 'active') {
			setTimeout(() => {
				closeModalHandler();
			}, 10000);
		}
	}, [status]);

	return (
		<Modal
			className="primary md"
			show={pendingModal}
			closable={apiTries < 10 && status === 'active'}
			onClose={closeModalHandler}
		>
			{apiTries < 10 && status !== 'active' && (
				<div className={styles.container}>
					<LoadingBanner style={{ width: 300, height: 'auto' }} />
					<div className={styles.title}>Hang on! Checking payment status...</div>
					<IconTridot style={{ width: 40, height: 'auto', marginBottom: 32 }} />
				</div>
			)}
			{apiTries < 10 && status === 'active' && (
				<div className={styles.container}>
					<SuccessSvg width="250px" height="250px" />
					<div className={styles.title}>Congratulations !</div>
					<Txt>
						{`Successfully added ${quantity} ${name}`}
						{' '}
					</Txt>
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
