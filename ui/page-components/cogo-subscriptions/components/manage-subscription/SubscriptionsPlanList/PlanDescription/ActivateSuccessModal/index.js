/* eslint-disable no-undef */
import { Modal } from '@cogoport/components';

import SuccessGif from '../../../../../asset/success.svg';

import styles from './styles.module.css';

function ActivateSuccessModal({ modal, setShowModal, name }) {
	const closeModal = () => {
		setShowModal(false);
		window?.location?.reload();
	};
	return (
		<Modal
			show={modal}
			className=" primary md"
			onClose={closeModal}
			onOuterClick={closeModal}
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
				<div className={styles.styled_div}>
					Would like to explore our other plans
					<div role="presentation" className={styles.click} onClick={closeModal}> click here </div>
				</div>
			</div>
		</Modal>
	);
}
export default ActivateSuccessModal;
