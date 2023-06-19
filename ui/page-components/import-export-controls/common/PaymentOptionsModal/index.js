import { cl, Modal } from '@cogoport/components';
import {
	IcAOfferFlexiblePaymentsTerms,
	IcACreditAndPayments,
	IcAAccountRelated,
} from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function PaymentOptionsModal({
	isUserSubscribed = false,
	showPaymentOptionsModal,
	setPaymentOptionsModal,
	validateSubmitHandler = () => {},
	getValues,
}) {
	const { query = {} } = useRouter();
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const subscriptionsUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/cogo-subscriptions`;

	const [paymentMode, setPaymentMode] = useState('');
	const submitHandler = (method) => {
		if (method === 'buySubscription') {
			const url = `${subscriptionsUrl}/manage-subscription`;
			setPaymentMode('buy');
			window.open(url, '_blank');
		} else if (method === 'buyAddon') {
			const url = `${subscriptionsUrl}/balance-history`;
			setPaymentMode('buy');
			window.open(url, '_blank');
		} else if (method === 'directPay') {
			setPaymentMode('directPay');
			const formValues = getValues();
			validateSubmitHandler(formValues);
		}
	};

	return (
		<Modal
			show={showPaymentOptionsModal}
			onClose={() => setPaymentOptionsModal(false)}
			closable={paymentMode === ''}
		>
			<div className={styles.container}>
				<div className={styles.heading}>Select mode of Payment</div>
				<div className={styles.card_container}>
					{!isUserSubscribed ? (
						<div
							className={cl`${styles.card} ${paymentMode === 'buy' && 'selected_card'}`}
							onClick={() => submitHandler('buySubscription')}
							role="presentation"
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAOfferFlexiblePaymentsTerms width={60} height={60} />
							<div className={styles.text}>Buy Subscription</div>
						</div>
					) : (
						<div
							className={cl`${styles.card} ${paymentMode === 'buy' && 'selected_card'}`}
							onClick={() => submitHandler('buyAddon')}
							role="presentation"
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAAccountRelated width={60} height={60} />
							<div className={styles.text}>Buy Add-Ons</div>
						</div>
					)}
					<div
						className={cl`${styles.card} ${paymentMode === 'directPay' && 'selected_card'}`}
						onClick={() => submitHandler('directPay')}
						role="presentation"
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
