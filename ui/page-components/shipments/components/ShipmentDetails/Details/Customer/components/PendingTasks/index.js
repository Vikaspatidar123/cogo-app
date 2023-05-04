import { Placeholder, Modal } from '@cogoport/components';
import { useContext, useState } from 'react';

import { ShipmentDetailContext } from '../../../../common/Context';
import useGetShipmentPendingTasks from '../../hooks/useGetShipmentPendingTasks';
import EmptyState from '../EmptyState';

import Card from './Card';
import Footer from './Footer';
import styles from './styles.module.css';
import Task from './Task';

function PendingTasks() {
	const [contextValues] = useContext(ShipmentDetailContext);
	const { shipment_data, primary_service } = contextValues || {};

	const [showModal, setShowModal] = useState(false);

	const [index, setIndex] = useState(0);

	const { tasks, total, loading, refetch } = useGetShipmentPendingTasks(
		shipment_data?.shipment_type,
	);
	console.log('tasks:', tasks);
	const emptyStateContent = {
		heading     : 'No Pending Tasks for you to Perform!',
		description : 'Looks like you dont have any task left. ',
	};
	return (
		<div className={styles.card_component}>
			{loading ? (
				<Placeholder />
			) : (
				<div className={`${tasks?.length === 0 ? styles.empty : ''} ${styles.container}`}>
					{tasks?.length > 0 ? (
						<>
							{(tasks || []).map((task, i) => {
								if (index === i) {
									return (
										<>
											<Card item={task} onClick={() => setShowModal(true)} />

											<Footer
												activeIndex={index}
												pendingTaskTotal={total}
												onClick={setIndex}
											/>
										</>
									);
								}
								return null;
							})}
						</>
					) : (
						<div className={styles.empty_container}>
							<EmptyState showContent={emptyStateContent} />
						</div>
					)}

					{showModal ? (
						<Modal
							show={showModal}
							onClose={() => setShowModal(false)}
							width={700}
						>
							<Task
								shipment_data={shipment_data}
								primary_service={primary_service}
								onCancel={() => setShowModal(false)}
								refetch={refetch}
								task={tasks[index]}
							/>
						</Modal>
					) : null}
				</div>
			)}
		</div>
	);
}

export default PendingTasks;
