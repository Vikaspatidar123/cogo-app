import { Modal } from '@cogoport/components';
import { IcCYelloCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CargoDetailsModal({ isOpen, handleModal, airwayDetails = {} }) {
	return (
		<Modal heading="CARGO DETAILS" onClose={handleModal} isOpen={isOpen}>
			<div className={styles.content}>
				<div className={styles.container_card}>
					<div className={styles.left_container}>
						<IcCYelloCircle size={3.5} />
					</div>
					<div className={styles.right_container}>
						<h3>
							Weight:
							{' '}
							<span className={styles.no_style}>{airwayDetails?.weight}</span>
						</h3>
						<h3>
							Piece:
							{' '}
							<span className={styles.no_style}>{airwayDetails?.piece}</span>
						</h3>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default CargoDetailsModal;
