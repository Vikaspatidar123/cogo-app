import { useState } from 'react';

import DetentionModal from './DetentionModal';
import styles from './styles.module.css';

function DetentionDetails({ disabled, trackerDetails, setTrackerDetails, ...props }) {
	const [isModalOpen, setModal] = useState(false);
	const { shipment_info } = trackerDetails || {};
	const { origin_detention, destination_detention, destination_demurrage } =		shipment_info || {};

	const isEmpty =		origin_detention == null
		&& destination_demurrage == null
		&& destination_detention == null;

	const handleModal = () => {
		if (disabled) return;
		setModal(!isModalOpen);
	};

	const renderInfo = () => {
		const hideOrigin = origin_detention == null;
		const hideDestination =			destination_detention == null && destination_demurrage == null;
		let originValue = '';
		let destinationValue = '';
		if (!hideOrigin) {
			if (origin_detention > 0) {
				originValue = `${origin_detention} detention days free`;
			}
		}
		if (!hideDestination) {
			if (destination_detention > 0 && destination_demurrage > 0) {
				destinationValue = `${destination_detention} 
				detention and ${destination_demurrage} demurrage days free`;
			} else if (destination_detention > 0) {
				destinationValue = `${destination_detention} detention days free`;
			} else if (destination_demurrage > 0) {
				destinationValue = `${destination_demurrage} demurrage days free`;
			}
		}
		return (
			<div role="presentation" className={styles.card} onClick={handleModal}>
				{!hideOrigin && (
					<div className={styles.info}>
						<div className={styles.label}>Origin:</div>
						<div className={styles.value}>{originValue}</div>
					</div>
				)}
				{!hideDestination && (
					<div className={styles.info}>
						<div className={styles.label}>Destination:</div>
						<div className={styles.value}>{destinationValue}</div>
					</div>
				)}
			</div>
		);
	};

	const renderEmpty = () => (
		<div
			role="presentation"
			className={styles.dash_button}
			onClick={() => handleModal()}
			disabled={disabled}
			{...props}
		>
			<p>Add available detention / demurrage free days for proactive alerts on expiry</p>
		</div>
	);
	return (
		<>
			{!isEmpty ? renderInfo() : renderEmpty()}
			{isModalOpen && (
				<DetentionModal
					isOpen={isModalOpen}
					handleModal={handleModal}
					setTrackerDetails={setTrackerDetails}
					trackerDetails={trackerDetails}
				/>
			)}
		</>
	);
}

export default DetentionDetails;
