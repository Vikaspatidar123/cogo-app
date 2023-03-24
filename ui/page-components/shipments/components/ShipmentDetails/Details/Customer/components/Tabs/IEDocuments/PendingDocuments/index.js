// import { startCase } from '@cogoport/front/utils';
// import { IcMPlus } from '@cogoport/icons-react';
import { Placeholder } from '@cogoport/components';
import { Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import EmptyState from '../../../EmptyState';

import styles from './styles.module.css';

import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

function PendingDocuments({
	pendingTasks = [],
	pendingTaskLoading = false,
	refetch = () => {},
}) {
	const [show, setShow] = useState(false);
	const [pendingTask, setPendingTask] = useState({});
	//	const [query, setQuery] = useState('');

	const handleClick = (pendingItem) => {
		setShow(!show);
		setPendingTask({
			...pendingTask,
			[pendingItem.id]: !pendingTask?.[pendingItem?.id],
		});
	};

	const [{ shipment_data, primary_service }] = useContext(
		ShipmentDetailContext,
	);

	return (
		<>
			<div className={`${styles.container} ${styles.ie_side_container}`}>
				{pendingTaskLoading ? (
					<Placeholder />
				) : (
					<div className={styles.sub_container}>
						<div className={styles.header}>
							{pendingTasks?.length}
							{' '}
							Pending Documents
						</div>

						<div className={styles.pending_box}>
							{!pendingTaskLoading && pendingTasks?.length > 0
								? pendingTasks?.map((pendingItem) => (
									<>
										<div
											role="presentation"
											className={`${styles.task_container} ${styles.ie_side}`}
											onClick={() => handleClick(pendingItem)}
										>
											<div className={`${styles.doc_name} ${styles.ie_side_text}`}>
												Add
												{' '}
												{startCase(pendingItem.task)}
											</div>

											<IcMPlus className="ie_side_svg" />
										</div>

										{/* {pendingTask?.[pendingItem?.id] ? (
											<Modal
												show={show}
												onClose={() => handleClick(pendingItem)}
												onOuterClick={() => handleClick(pendingItem)}
												className="primary lg"
											>
												<TaskCard
													task={pendingItem}
													onCancel={() => handleClick(pendingItem)}
													refetch={refetch}
													shipment_data={shipment_data}
													primary_service={primary_service}
													services={shipment_data?.all_services}
													type="modal"
												/>
											</Modal>
										) : null} */}
									</>
								  ))
								: null}
						</div>
					</div>
				)}
			</div>

			{!pendingTaskLoading && pendingTasks?.length === 0 ? (
				<EmptyState />
			) : null}
		</>
	);
}

export default PendingDocuments;
