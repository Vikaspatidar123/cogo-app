import { Loader, Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function DeleteModal({
	deleteModal, setDeleteModal, deleteTradeParty, deleteLoading, itemData,
}) {
	return (
		<Modal
			size="md"
			placement="top"
			show={deleteModal}
			onClose={() => setDeleteModal(false)}
		>
			<div className={styles.wrapper}>
				<div className={styles.text_wrapper}>
					Are you sure you want to delete
					&nbsp;
					{itemData?.partyName?.toUpperCase()}
					&nbsp;
					from
					the trade party list?
				</div>
				<div className={styles.button_wrapper}>
					<Button
						className={styles.no}
						onClick={() => {
							setDeleteModal(false);
						}}
					>
						N0
					</Button>
					<Button
						className={styles.yes}
						onClick={() => {
							deleteTradeParty({ itemData, setDeleteModal });
						}}
						disabled={deleteLoading}
					>
						{deleteLoading ? <Loader /> : 'Yes'}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteModal;
