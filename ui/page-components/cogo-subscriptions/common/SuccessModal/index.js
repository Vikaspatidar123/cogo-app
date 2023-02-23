import { Modal } from '@cogoport/components';

import SuccessGif from '../../asset/success.svg';
import redirectUrl from '../../utils/redirectUrl';

import styles from './styles.module.css';

function SuccessModal({
	modal, setShowModal, getPlan, name, setUserPlan,
}) {
	const { redirectManageSubscription } = redirectUrl();
	const closeModal = () => {
		getPlan({ setUserPlan });
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
				<SuccessGif width={200} height={200} />
				<div className={styles.label}>Congratulations!</div>
				<div className={styles.side_label}>
					You are now subscribed to
					{' '}
					{name}
					. Start exploring features and optimize your
					business operations!
				</div>
				<div className={styles.stylediv}>
					Would like to explore our other plans
					<u className={styles.click} role="presentation" onClick={closeModal}> click here </u>
				</div>
			</div>
		</Modal>
	);
}
export default SuccessModal;
