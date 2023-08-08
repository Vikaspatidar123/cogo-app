import { cl, Modal } from '@cogoport/components';
import {
	IcAOfferFlexiblePaymentsTerms,
	IcACreditAndPayments,
	IcAAccountRelated,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
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
	const { org_id = '', branch_id = '' } = query || {};

	const { t } = useTranslation(['importExportControls']);

	const subscriptionsUrl = `${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}/saas/cogo-subscriptions`;

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
				<div className={styles.heading}>{t('importExportControls:payment_modal_title')}</div>
				<div className={styles.card_container}>
					{!isUserSubscribed ? (
						<div
							className={cl`${styles.card} ${paymentMode === 'buy' && 'selected_card'}`}
							onClick={() => submitHandler('buySubscription')}
							role="presentation"
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAOfferFlexiblePaymentsTerms width={60} height={60} />
							<div className={styles.text}>{t('importExportControls:payment_modal_subscription')}</div>
						</div>
					) : (
						<div
							className={cl`${styles.card} ${paymentMode === 'buy' && 'selected_card'}`}
							onClick={() => submitHandler('buyAddon')}
							role="presentation"
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAAccountRelated width={60} height={60} />
							<div className={styles.text}>{t('importExportControls:payment_modal_addon')}</div>
						</div>
					)}
					<div
						className={cl`${styles.card} ${paymentMode === 'directPay' && 'selected_card'}`}
						onClick={() => submitHandler('directPay')}
						role="presentation"
					>
						{paymentMode === 'directPay' && <div className={styles.dot} />}
						<IcACreditAndPayments width={60} height={60} />
						<div className={styles.text}>{t('importExportControls:payment_modal_direct_pay')}</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PaymentOptionsModal;
