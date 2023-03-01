import { Modal, cl } from '@cogoport/components';
import {
	IcAOfferFlexiblePaymentsTerms,
	IcACreditAndPayments,
	IcAAccountRelated,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function PayMethodModal({
	showPayMethodModal,
	setShowPayMethodModal,
	isUserSubscribed = false,
	paymentMode = '',
	setPaymentMode,
	checkoutHandler = () => {},
}) {
	const { query = {} } = useRouter();
	const { org_id, branch_id, account_type } = query || {};
	const subscriptionsUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/cogo-subscriptions`;

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
			checkoutHandler();
			setShowPayMethodModal(false);
		}
	};
	return (
		<Modal
			className="primary"
			show={showPayMethodModal}
			onClose={() => setShowPayMethodModal(false)}
			size="lg"
		>
			<div>
				<div className={styles.heading}>Select mode of Payment</div>
				<div className={styles.card_container}>
					{!isUserSubscribed && (
						<div
							role="presentation"
							className={cl`${styles.card} ${paymentMode === 'buy' && styles.selected_card}`}
							onClick={() => submitHandler('buySubscription')}
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAOfferFlexiblePaymentsTerms width={60} height={60} />
							<div className={cl`${styles.txt} ${styles.text}`}>Buy Subscription</div>
						</div>
					)}
					{isUserSubscribed && (
						<div
							role="presentation"
							className={cl`${styles.card} ${paymentMode === 'buy' && styles.selected_card}`}
							onClick={() => submitHandler('buyAddon')}
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAAccountRelated width={60} height={60} />
							<div className={cl`${styles.txt} ${styles.text}`}>Buy Add-Ons</div>
						</div>
					)}
					<div
						role="presentation"
						className={cl`${styles.card} ${paymentMode === 'directPay' && styles.selected_card}`}
						onClick={() => submitHandler('directPay')}
					>
						{paymentMode === 'directPay' && <div className={styles.dot} />}
						<IcACreditAndPayments width={60} height={60} />
						<div className={cl`${styles.txt} ${styles.text}`}>Direct Payment</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PayMethodModal;
