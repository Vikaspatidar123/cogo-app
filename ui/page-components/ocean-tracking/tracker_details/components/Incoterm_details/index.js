// import React, { Fragment, useState } from 'react';

// import { useSaasState } from '../../../../common/context';
// import IconPlus from '../../../../common/icons/plus.svg';
// import { Card, DashedButton } from '../../../../common/ui';

// import IncotermModal from './components/add-modal';
// import { POC_TYPES } from './components/add-modal/common/constants';
// import { IncotermContainer } from './styles';
import { useState } from 'react';

import { POC_TYPES } from '../../common/constant';

import IncotermModal from './Incoterm';
import styles from './styles.module.css';

function IncotermDetails({ disabled, fetchTrackerDetails, trackerDetails, ...props }) {
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
		<div role="presentation" className={styles.dash_button} onClick={() => handleModal()} disabled={disabled} {...props}>
			{/* <IconPlus /> */}
			<p>Add incoterms and shipper / consignee details to customize alerts</p>
		</div>
	);
	return (
		<>
			{poc_details?.length > 0 || shipment_details?.incoterm != null
				? renderInfo()
				: renderEmpty()}
			{isModalOpen && (
				<IncotermModal
					isOpen={isModalOpen}
					handleModal={handleModal}
					fetchTrackerDetails={fetchTrackerDetails}
					trackerDetails={trackerDetails}
				/>
			)}
		</>
	);
}

export default IncotermDetails;
