import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import redirectUrl from '../../utils/redirectUrl';

import styles from './styles.module.css';

function SuccessModal({
	modal, setShowModal, getPlan, name,
}) {
	const { t } = useTranslation(['subscriptions']);
	const { redirectManageSubscription } = redirectUrl();
	const closeModal = () => {
		getPlan();
		setShowModal(false);
		redirectManageSubscription();
	};
	return (
		<Modal
			show={modal}
			onClose={closeModal}
			placement="top"
			closeOnOuterClick={closeModal}
			size="md"
		>
			<div className={styles.flex_div}>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/success.svg" alt="cogo" />
				<div className={styles.label}>{t('subscriptions:congratulations_text')}</div>
				<div className={styles.side_label}>
					{t('subscriptions:subscribed_conformation_text')}
					{name}
					{t('subscriptions:subscribed_description_text')}
				</div>
				<div className={styles.style_div}>
					{t('subscriptions:explore_text')}
					<u className={styles.click} role="presentation" onClick={closeModal}>
						{t('subscriptions:click_here_text')}
					</u>
				</div>
			</div>
		</Modal>
	);
}
export default SuccessModal;
