import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { POC_TYPES } from '../../common/constant';

import PocModal from './PocModal';
import styles from './styles.module.css';

function PocDetails({ disabled, fetchTrackerDetails, trackerDetails, ...props }) {
	const { poc_details = [], shipment_details } = trackerDetails || {};
	const [isModalOpen, setModal] = useState(false);
	const handleModal = () => {
		if (disabled) return;
		setModal(!isModalOpen);
	};

	const renderInfo = () => {
		const shipperDetails = poc_details.filter(
			(item) => item.user_type === POC_TYPES.SHIPPER,
		)[0];
		const consigneeDetails = poc_details.filter(
			(item) => item.user_type === POC_TYPES.CONSIGNEE,
		)[0];
		const { trade_type } = shipment_details || {};
		const incoterm = trackerDetails?.shipment_info?.incoterm;
		return (
			<div role="presentation" className={styles.card} onClick={handleModal}>
				{shipperDetails != null && (
					<div className={styles.info}>
						<div className={styles.label}>Shipper:</div>
						<div className={styles.value}>{shipperDetails?.name}</div>
					</div>
				)}
				{incoterm != null && (
					<div
						className={styles.incoterm}
						style={{ marginBottom: consigneeDetails == null ? 0 : null }}
					>
						<div>
							{trade_type}
							: Inco-
							{incoterm}
						</div>
					</div>
				)}
				{consigneeDetails != null && (
					<div className={styles.info}>
						<div className={styles.label}>Consignee:</div>
						<div className={styles.value}>{consigneeDetails?.name}</div>
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
			<div className={styles.flex}>
				<div className={styles.flexs}>
					<IcMPlus />
				</div>
				<p className={styles.flexs}>Add POC Details</p>
			</div>

		</div>
	);

	return (
		<>
			{poc_details?.length > 0 || shipment_details?.incoterm != null
				? renderInfo()
				: renderEmpty()}
			{isModalOpen && (
				<PocModal
					isOpen={isModalOpen}
					handleModal={handleModal}
					fetchTrackerDetails={fetchTrackerDetails}
					trackerDetails={trackerDetails}
				/>
			)}
		</>
	);
}

export default PocDetails;
