import { Modal, Button } from '@cogoport/components';
import { IcCSad, IcCVeryHappy, IcMInformation } from '@cogoport/icons-react';
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

const textForSubscriptionStatusMapping = ({ status, t }) => {
	const Mapping = {
		failed             : t('subscriptions:payment_failed_status_text'),
		activation_pending : t('subscriptions:payment_pending_status_text'),
		pending            : t('subscriptions:checking_payment_description_text'),
		default            : t('subscriptions:checking_payment_description_text'),
	};
	return Mapping[status] || Mapping.default;
};

const iconForSubscriptionStatusMapping = ({ status }) => {
	const Mapping = {
		failed             : IcCSad,
		activation_pending : IcCVeryHappy,
		pending            : IcMInformation,
		default            : IcMInformation,
	};
	return Mapping[status] || Mapping.default;
};

function PendingModal({
	razorLoading,
	paymentStatus,
	setRazorLoading,
	apiTries,
	setAddModal,
}) {
	const { status = '' } = paymentStatus || {};
	const { t } = useTranslation(['subscriptions']);

	const Icon = iconForSubscriptionStatusMapping({ status });

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
			{apiTries > PAINTING_TIME && status !== 'active' && (
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

			{apiTries < CLOSE_TIME && (
				<div className={styles.container}>
					<Icon width={52} height={52} fill="#FBDC00" />
					<div className={`${styles.txt} ${styles.error}`}>
						{textForSubscriptionStatusMapping({ t, status })}
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
