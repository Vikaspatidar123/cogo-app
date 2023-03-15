import { IcMEnquiriesReceived, IcMWasteScrap, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import usePutArchiveUnarchiveStatus from '../../../../../hooks/usePutArchiveUnarchiveStatus';
import DeleteModal from '../DeleteModal';

import styles from './styles.module.css';

function Popover({
	itemData,
	deleteTradeParty,
	deleteLoading,
	setShowModal,
	setTradePartyDetails,
	setIsEdit,

	archived,
	getList,
}) {
	const [deleteModal, setDeleteModal] = useState(false);
	const {
		tradePartyStatus,
	} = usePutArchiveUnarchiveStatus({
		archived,
		getList,
	});

	const renderFunction = () => {
		tradePartyStatus(itemData);
	};

	return (
		<div>
			{!archived && (
				<div
					className={styles.div}
					role="presentation"
					onClick={() => {
						setIsEdit(true);
						setTradePartyDetails(itemData);
						setShowModal(true);
					}}
				>
					<IcMEdit className={styles.icon} />
					<div className={styles.label}>Edit</div>
				</div>
			)}
			<div className={styles.div} role="presentation" onClick={renderFunction}>
				<IcMEnquiriesReceived className={styles.icon} />
				<div className={styles.label}>{!archived ? 'Archive' : 'Unarchive'}</div>
			</div>
			{!archived && itemData?.totalQuotes <= 0 && (
				<div className={styles.div}>
					<IcMWasteScrap className={styles.icon} />
					<div
						className={styles.label}
						role="presentation"
						onClick={() => setDeleteModal(true)}
					>
						Delete
					</div>
				</div>
			)}
			{deleteModal && (
				<DeleteModal
					deleteModal={deleteModal}
					setDeleteModal={setDeleteModal}
					deleteTradeParty={deleteTradeParty}
					deleteLoading={deleteLoading}
					itemData={itemData}
				/>
			)}
		</div>
	);
}
export default Popover;
