import { Modal } from '@cogoport/components';

import redirectUrl from '../../utils/redirectUrl';

import styles from './styles.module.css';

function SuccessModal({
	modal, setShowModal, getPlan, name,
}) {
	const { redirectManageSubscription } = redirectUrl();
	const closeModal = () => {
		getPlan();
		setShowModal(false);
		redirectManageSubscription();
	};
	return (
		<Modal
			show={modal}
			className=" primary md"
			onClose={closeModal}
			placement="top"
			closeOnOuterClick={closeModal}
			size="md"
		>
			<div className={styles.flex_div}>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/success.svg" alt="cogo" />
				<div className={styles.label}>Congratulations!</div>
				<div className={styles.side_label}>
					You are now subscribed to
					{name}
					. Start exploring features and optimize your
					business operations!
				</div>
				<div className={styles.style_div}>
					Would like to explore our other plans
					<u className={styles.click} role="presentation" onClick={closeModal}> click here </u>
				</div>
			</div>
		</Modal>
	);
}
export default SuccessModal;
