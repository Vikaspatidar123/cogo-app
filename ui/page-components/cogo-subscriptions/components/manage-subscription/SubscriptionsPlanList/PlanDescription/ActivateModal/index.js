import { Modal, Button } from '@cogoport/components';
// import {
// 	StyledModal,
// 	Container,
// 	DivTitle,
// 	DivText,
// 	ButtonDiv,
// 	BlackButton,
// 	RedButton,
// 	Image,
// 	ImageContainer,
// 	PlanText,
// } from './styles';

import styles from './styles.module.css';

function ActivateModal({
	showActivateModal,
	setShowActivateModal,
	plan_pricing_id,
	subscriptionActivateNow,
	setShowModal,
	isMobile,
	item,
}) {
	const { description = '' } = item || {};
	return (
		<Modal
			show={showActivateModal}
			onClose={() => setShowActivateModal(false)}
			onOuterClick={() => setShowActivateModal(false)}
			width={isMobile ? 300 : 500}
			closable={false}
		>
			<div className={styles.container}>
				<div className={styles.image_container}>
					<div className={styles.image}>
						<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/activate-icon.svg' alt='cogo' />
					</div>
				</div>
				<div className={styles.div_title}>Activating your plan !</div>
				<div className={styles.div_title}>
					Are you sure you want to activate the
					<div className={styles.plan_text}>
						{description}
						{' '}
						Plan
					</div>
					now ?
				</div>
				<div className={styles.button_div}>
					<Button
						size="md"
						themeType="primary"
						onClick={() => setShowActivateModal(false)}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="accent"
						onClick={() => {
							subscriptionActivateNow(
								plan_pricing_id,
								setShowActivateModal,
								setShowModal,
							);
						}}
					>
						Activate
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ActivateModal;
