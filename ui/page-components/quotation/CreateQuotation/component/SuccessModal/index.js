import { Modal } from '@cogoport/components';

import iconUrl from '../../../utils/iconUrl.json';

import styles from './styles.module.css';

function SuccessModal({ showSuccessModal, setShowSuccessModal }) {
	return (
		<Modal
			show={showSuccessModal}
			onClose={() => setShowSuccessModal(false)}
		>
			<div className={styles.img_container}>
				<img src={iconUrl.dataSaved} alt="Data saved Successfully" className={styles.saved_img} />
			</div>
			<div className={styles.title}>Data Saved Successfully</div>
			<div className={styles.text}>
				<span>
					Your applicable charges is applied on the quotation. To check this details in
					future please refer Transaction History section
				</span>
			</div>

		</Modal>
	);
}

export default SuccessModal;
