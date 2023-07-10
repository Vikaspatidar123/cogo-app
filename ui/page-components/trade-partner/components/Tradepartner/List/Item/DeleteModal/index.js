import { Loader, Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function DeleteModal({
	deleteModal, setDeleteModal, deleteTradeParty, deleteLoading, itemData,
}) {
	const { t } = useTranslation(['tradePartner']);

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
					{t('tradePartner:delete_modal_text_1')}
					&nbsp;
					<b>{itemData?.partyName?.toUpperCase()}</b>
					&nbsp;
					{t('tradePartner:delete_modal_text_2')}
				</div>
				<div className={styles.button_wrapper}>
					<Button
						className={styles.no}
						onClick={() => {
							setDeleteModal(false);
						}}
						themeType="secondary"
					>
						{t('tradePartner:archive_modal_button_label_2')}
					</Button>
					<Button
						className={styles.yes}
						onClick={() => {
							deleteTradeParty({ itemData, setDeleteModal });
						}}
						disabled={deleteLoading}
					>
						{deleteLoading ? <Loader /> : `${t('tradePartner:archive_modal_button_label_2')}`}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteModal;
