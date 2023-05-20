import { Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function DeleteModal({ showDelete, setShowDelete = true, deleteSchedule, schedule }) {
	return (
		<Modal size="md" show={showDelete} onClose={() => setShowDelete()} placement="top">
			<div className={styles.heading}>
				<IcMDelete width={30} height={30} />
			</div>
			<h3 className={styles.heading}>Are you sure you want to delete?</h3>
			<div className={styles.button_wrapper}>
				<Button
					onClick={() => setShowDelete()}
					themeType="secondary"
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>
				<Button onClick={() => {
					deleteSchedule(schedule?.id);
					setShowDelete(false);
				}}
				>
					Delete
				</Button>
			</div>
		</Modal>
	);
}

export default DeleteModal;
