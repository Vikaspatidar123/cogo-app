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
	const { push } = useRouter();

	const { t } = useTranslation(['importExportDoc']);

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
				<div className={styles.heading}>{t('importExportDoc:payment_modal_title')}</div>
				<div className={styles.card_container}>
					{!isUserSubscribed && (
						<div
							className={cl`${styles.card} ${paymentMode === 'buy' && styles.selected_card}`}
							role="presentation"
							onClick={() => submitHandler('buySubscription')}
						>
							{paymentMode === 'buy' && <div className={styles.dot} />}
							<IcAOfferFlexiblePaymentsTerms width={60} height={60} />
							<div className={styles.text}>{t('importExportDoc:payment_modal_subscription')}</div>
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
							<div className={styles.text}>{t('importExportDoc:payment_modal_addon')}</div>
						</div>
					)}
					<div
						className={cl`${styles.card} ${paymentMode === 'directPay' && styles.selected_card}`}
						role="presentation"
						onClick={() => submitHandler('directPay')}
					>
						{paymentMode === 'directPay' && <div className={styles.dot} />}
						<IcACreditAndPayments width={60} height={60} />
						<div className={styles.text}>{t('importExportDoc:payment_modal_direct_pay')}</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PaymentOptionsModal;
