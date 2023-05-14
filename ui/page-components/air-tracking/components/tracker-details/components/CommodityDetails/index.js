import { Placeholder } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import DetentionModal from './DetentionModal';
import styles from './styles.module.css';

function DetentionDetails({ disabled, trackerDetails, loading, setTrackerDetails, fetchTrackerDetails }) {
	const [isModalOpen, setModal] = useState(false);
	const { commodity_details } = trackerDetails || {};
	const isEmpty = commodity_details?.commodity == null;

	const handleModal = () => {
		if (disabled) return;
		setModal(!isModalOpen);
	};

	const renderInfo = () => {
		const hideCommodity = commodity_details?.commodity == null;

		let value = '';
		if (!hideCommodity) {
			value = `${commodity_details?.commodity}`;
		}
		return (
			<div role="presentation" className={styles.card} onClick={handleModal}>
				<div className={styles.head}>COMMODITY DETAILS</div>
				{!hideCommodity && (
					<div className={styles.dash_button}>
						<div className={styles.heading}>Commodity:</div>
						<div className={styles.value}>{value}</div>
					</div>
				)}
			</div>
		);
	};

	const renderEmpty = () => (
		<div
			role="presentation"
			className={styles.commodity_details}
			onClick={() => handleModal()}
			disabled={disabled}
		>
			{!loading
				? (
					<div
						className={styles.dash}
					>
						<div className={styles.icon}><IcMPlus width={30} height={30} /></div>

						<div className={styles.heading}>Add Available Commodity</div>
					</div>
				) : (<Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />)}
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
					fetchTrackerDetails={fetchTrackerDetails}
				/>
			)}
		</>
	);
}

export default DetentionDetails;
