import { Loader, Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
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
				<div>
					<IcMDelete width={30} height={30} />
				</div>
				<div className={styles.text_wrapper}>
					Are you sure you want to delete
					&nbsp;
					<b>{itemData?.partyName?.toUpperCase()}</b>
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
						themeType="secondary"
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
