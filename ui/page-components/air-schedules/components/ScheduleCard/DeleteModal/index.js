import { Button, Modal } from '@cogoport/components';
import React from 'react';

function DeleteModal({ showDelete, setShowDelete = true, deleteSchedule, schedule }) {
	return (
		<Modal size="md" show={showDelete} onClose={() => setShowDelete()} placement="top">
			<Modal.Header title="Are you sure you want to delete?" />
			<Modal.Footer>
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
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
