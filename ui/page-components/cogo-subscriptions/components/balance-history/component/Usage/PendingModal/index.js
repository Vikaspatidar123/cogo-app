import { Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';

import {
	SET_TIME,
	PAINTING_TIME,
	CLOSE_TIME,
} from '../../../../../constants/dimensions';
import redirectUrl from '../../../../../utils/redirectUrl';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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
	const { t } = useTranslation(['subscriptions']);
	const { redirectBalanceHistory } = redirectUrl();

	const closeModalHandler = useCallback(() => {
		setPendingModal(false);
		setRazorLoading(false);
		redirectBalanceHistory();
		setAddModal(false);
	}, [redirectBalanceHistory, setAddModal, setPendingModal, setRazorLoading]);

	useEffect(() => {
		if (apiTries > PAINTING_TIME) {
			setTimeout(() => {
				closeModalHandler();
			}, SET_TIME);
		}
	}, [apiTries, closeModalHandler]);

	useEffect(() => {
		if (status === 'active') {
			setTimeout(() => {
				closeModalHandler();
			}, SET_TIME);
		}
	}, [closeModalHandler, status]);

	return (
		<Modal
			show={pendingModal}
			closable={apiTries < PAINTING_TIME && status === 'active'}
			onClose={closeModalHandler}
		>
			{apiTries < PAINTING_TIME && status !== 'active' && (
				<div className={styles.container}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.loading_banner}
						alt={t('subscriptions:loading_text')}
						width={300}
						height={200}
					/>
					<div className={styles.title}>{t('subscriptions:checking_payment_text')}</div>
					<Image
						src={GLOBAL_CONSTANTS.image_url.loading}
						alt={t('subscriptions:cogo_text')}
						width={30}
						height={30}
					/>
				</div>
			)}
			{apiTries < PAINTING_TIME && status === 'active' && (
				<div className={styles.container}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.success_image}
						alt={t('subscriptions:cogo_text')}
						width={300}
						height={200}
					/>
					<div className={styles.title}>{t('subscriptions:congratulations_text')}</div>
					<div className={styles.txt}>
						{`${t('subscriptions:successfully_added_text')} ${quantity} ${name}`}
					</div>
				</div>
			)}

			{apiTries > CLOSE_TIME && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={`${styles.txt} ${styles.error}`}>
						{t('subscriptions:notify_message_text')}
					</div>
					<Button
						size="sm"
						themeType="secondary"
						type="button"
						onClick={closeModalHandler}
					>
						{t('subscriptions:close_text')}

					</Button>
				</div>
			)}
		</Modal>
	);
}

export default PendingModal;
