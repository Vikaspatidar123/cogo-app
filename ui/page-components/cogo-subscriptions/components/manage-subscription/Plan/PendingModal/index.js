import { Modal, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';

import {
	SET_TIME,
	PAINTING_TIME,
	CLOSE_TIME,
} from '../../../../constants/dimensions';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PendingModal({
	razorLoading,
	paymentStatus,
	setRazorLoading,
	apiTries,
	setAddModal,
}) {
	const { status = '' } = paymentStatus || {};
	const { t } = useTranslation(['subscriptions']);

	const closeModalHandler = useCallback(() => {
		setRazorLoading(false);
	}, [setRazorLoading]);

	useEffect(() => {
		if (apiTries < PAINTING_TIME && status === 'active') {
			setAddModal(true);
			setRazorLoading(false);
		}
		if (apiTries > PAINTING_TIME) {
			setTimeout(() => {
				closeModalHandler();
			}, SET_TIME);
		}
	}, [apiTries, closeModalHandler, setAddModal, setRazorLoading, status]);

	return (
		<Modal
			size="md"
			placement="top"
			show={razorLoading}
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			{apiTries < PAINTING_TIME && status !== 'active' && (
				<div className={styles.container}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.loading_banner}
						alt={t('subscriptions:cogo_text')}
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

			{apiTries > CLOSE_TIME && (
				<div className={styles.container}>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<div className={`${styles.txt} ${styles.error}`}>
						{t('subscriptions:checking_payment_description_text')}
					</div>
					<Button
						size="md"
						themeType="secondary"
						onClick={closeModalHandler}
						type="button"
					>
						{t('subscriptions:close_text')}
					</Button>
				</div>
			)}
		</Modal>
	);
}

export default PendingModal;
