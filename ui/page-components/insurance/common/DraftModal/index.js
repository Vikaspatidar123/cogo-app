import { Modal } from '@cogoport/components';
import { useEffect } from 'react';

import { draftSavedUrl } from '../constants';

import styles from './styles.module.css';

function DraftModal({ draftModal, setDraftModal }) {
	useEffect(() => {
		setTimeout(() => {
			setDraftModal(false);
		}, 1000);
	});
	return (
		<Modal
			show={draftModal}
			onClose={() => setDraftModal(false)}
			size="md"
			placement="top"
		>
			<Modal.Body>
				<div className={styles.wrapper}>
					<img className={styles.image} src={draftSavedUrl} alt="cogo" />
					<div className={styles.text}>Successfully saved as draft!!!</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DraftModal;
