import { useState } from 'react';

import useDeleteRfq from '../../../../../hooks/useDeleteRfq';
import useDuplicateRfq from '../../../../../hooks/useDuplicateRfq';

import ConfirmationModal from './ConfirmationModal';
import Details from './Details';
import Ports from './Ports';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function QuotationsCard({ rfqItem, activeFilter, getRfqList, getRfqStats }) {
	const [showModal, setShowModal] = useState({
		status : false,
		type   : '',
	});

	const { id: rfqId, serial_id } = rfqItem;
	const [rfqName, setRfqName] = useState('');
	const isDelete = showModal.type === 'delete';

	const { duplicateRfq, duplicateLoading } = useDuplicateRfq({
		getRfqList,
		getRfqStats,
		rfqId,
	});

	const { deleteRfq, deleteLoading } = useDeleteRfq({
		getRfqList,
		getRfqStats,
		rfqId,
	});

	const handleDeleteRfq = async () => {
		setShowModal({ status: true, type: 'delete' });
	};

	const handleDuplicateRfq = async () => {
		setShowModal({ status: true, type: 'duplicate', serialId: serial_id });
	};

	return (
		<div className={styles.container}>
			<Details rfqItem={rfqItem} />

			{rfqItem.status !== 'uploaded' && (
				<ServiceDetails rfqItem={rfqItem} activeFilter={activeFilter} />
			)}

			<Ports
				rfqItem={rfqItem}
				handleDuplicateRfq={handleDuplicateRfq}
				handleDeleteRfq={handleDeleteRfq}
			/>

			<ConfirmationModal
				rfqId={rfqId}
				showModal={showModal}
				setShowModal={setShowModal}
				setRfqName={setRfqName}
				rfqName={rfqName}
				loading={isDelete ? deleteLoading : duplicateLoading}
				handleAction={isDelete ? deleteRfq : duplicateRfq}
			/>
		</div>
	);
}

export default QuotationsCard;
