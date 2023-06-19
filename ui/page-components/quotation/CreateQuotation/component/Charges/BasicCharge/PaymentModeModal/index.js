/* eslint-disable no-undef */
import { Modal } from '@cogoport/components';
import {
	IcAReports, IcAOfferFlexiblePaymentsTerms,
	IcAAccountRelated, IcACreditAndPayments,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

import useRedirectUrl from '@/ui/page-components/quotation/utils/redirectUrl';

function PaymentModeModal({
	paymentModal,
	setPaymentModal, isUserSubscribed = false, paymentMode, setPaymentMode, setValidateProduct,
}) {
	const { subscriptionsUrl } = useRedirectUrl();

	const submitHandler = (value) => {
		if (value === 'subscription') {
			const url = `${subscriptionsUrl}/manage-subscription`;
			setPaymentModal(false);
			setPaymentMode('buy');
			window.open(url, '_blank');
		} else if (value === 'buyAddon') {
			const url = `${subscriptionsUrl}/balance-history`;
			setPaymentModal(false);
			setPaymentMode('buy');
			window.open(url, '_blank');
		} else if (value === 'directPay') {
			setValidateProduct(true);
			setPaymentMode('directPay');
		}
	};

	return (
		<Modal show={paymentModal} onClose={() => setPaymentModal(false)}>
			<div className={styles.title_container}>
				<IcAReports width={35} height={35} />
				<h2 className={styles.title}>Get Accurate Data</h2>
			</div>
			<h3 className={styles.heading}>Select mode of Payment</h3>
			<div className={styles.card_container}>
				{!isUserSubscribed && (
					<div
						className={`${styles.card} ${paymentMode === 'buy' && styles.selectedCard}`}
						role="presentation"
						onClick={() => submitHandler('subscription')}
					>
						{paymentMode === 'buy' && <div className={styles.dot} />}
						<IcAOfferFlexiblePaymentsTerms width={60} height={60} />
						<p className={styles.text}>Buy Subscription</p>
					</div>
				)}
				{isUserSubscribed && (
					<div
						className={`${styles.card} ${paymentMode === 'buy' && styles.selectedCard}`}
						onClick={() => submitHandler('buyAddon')}
						role="presentation"
					>
						{paymentMode === 'buy' && <div className={styles.dot} />}
						<IcAAccountRelated width={60} height={60} />
						<p className={styles.text}>Buy Add-Ons</p>
					</div>
				)}
				<div
					className={`${styles.card} ${paymentMode === 'directPay' && styles.selectedCard}`}
					onClick={() => submitHandler('directPay')}
					role="presentation"
				>
					{paymentMode === 'directPay' && <div className={styles.dot} />}
					<IcACreditAndPayments width={60} height={60} />
					<p className={styles.text}>Direct Payment</p>
				</div>
			</div>
		</Modal>
	);
}
export default PaymentModeModal;
