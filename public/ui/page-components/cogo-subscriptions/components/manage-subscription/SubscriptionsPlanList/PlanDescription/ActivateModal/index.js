import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ActivateModal({
	showActivateModal,
	setShowActivateModal,
	plan_pricing_id,
	subscriptionActivateNow,
	setShowModal,
	item,
}) {
	const { t } = useTranslation(['subscriptions']);
	const onActive = () => {
		subscriptionActivateNow(
			plan_pricing_id,
			setShowActivateModal,
			setShowModal,
		);
	};
	const { description = '' } = item || {};
	return (
		<Modal
			show={showActivateModal}
			onClose={() => setShowActivateModal(false)}
			onOuterClick={() => setShowActivateModal(false)}
			closable={false}
		>

			<Modal.Body className={styles.styled_modal}>
				<div className={styles.image_container}>
					<div className={styles.image}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.active_image}
							alt={t('subscriptions:cogo_text')}
							width={200}
							height={120}
						/>
					</div>
				</div>
				<div className={styles.div_title}>{t('subscriptions:activating_plan_text')}</div>
				<div className={styles.div_title}>
					<div>{t('subscriptions:active_conformation_message')}</div>
					<div className={styles.plan_text}>
						<div className={styles.plan}>
							{description}
						</div>
						<div>{t('subscriptions:plan_text')}</div>
					</div>
					<div>{t('subscriptions:now_text')}</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="primary"
					onClick={() => setShowActivateModal(false)}
					className={styles.button}
					type="button"
				>
					{t('subscriptions:cancel_text')}
				</Button>
				<Button
					size="md"
					themeType="accent"
					onClick={() => onActive()}
					type="button"
				>
					{t('subscriptions:activate_button_text')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ActivateModal;
