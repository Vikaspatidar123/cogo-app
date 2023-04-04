import { cl, Modal } from '@cogoport/components';
import {
	IcAOfferFlexiblePaymentsTerms,
	IcACreditAndPayments,
	IcAAccountRelated,
} from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './styles.module.css';

function PaymentOptionsModal({
	isUserSubscribed = false,
	showPaymentOptionsModal,
	setPaymentOptionsModal,
	validateSubmitHandler = () => {},
	getValues,
}) {
	const { push } = useRouter();
	const [paymentMode, setPaymentMode] = useState('');
	const submitHandler = (method) => {
		if (method === 'buySubscription') {
			setPaymentMode('buy');
			push('/saas/cogo-subscriptions/manage-subscription');
		} else if (method === 'buyAddon') {
			setPaymentMode('buy');
			push('/saas/cogo-subscriptions/balance-history');
		} else if (method === 'directPay') {
			setPaymentMode('directPay');
			const formValues = getValues();
			validateSubmitHandler(formValues);
		}
	};

	return (
		<Modal show={showPaymentOptionsModal} onClose={() => setPaymentOptionsModal(false)}>
			<div>
				<div className={styles.heading}>Select mode of Payment</div>
				<div className={styles.card_container}>
					{!isUserSubscribed && (
						<div
							className={cl`${styles.card} ${paymentMode === 'buy' && styles.selected_card}`}
							role="presentation"
							onClick={() => submitHandler('buySubscription')}
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAOfferFlexiblePaymentsTerms width={60} height={60} />
							<div className={styles.text}>Buy Subscription</div>
						</div>
					)}
					{isUserSubscribed && (
						<div
							className={cl`${styles.card} ${paymentMode === 'buy' && styles.selected_card}`}
							role="presentation"
							onClick={() => submitHandler('buyAddon')}
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAAccountRelated width={60} height={60} />
							<div className={styles.text}>Buy Add-Ons</div>
						</div>
					)}
					<div
						className={cl`${styles.card} ${paymentMode === 'directPay' && styles.selected_card}`}
						role="presentation"
						onClick={() => submitHandler('directPay')}
					>
						{paymentMode === 'directPay' && <div className={styles.dot} />}
						<IcACreditAndPayments width={60} height={60} />
						<div className={styles.text}>Direct Payment</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PaymentOptionsModal;
