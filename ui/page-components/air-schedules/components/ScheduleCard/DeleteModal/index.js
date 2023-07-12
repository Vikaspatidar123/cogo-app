import { Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function DeleteModal({ showDelete, setShowDelete = true, deleteSchedule, schedule, loading = false }) {
	const { t } = useTranslation(['airSchedule']);
	return (
		<Modal size="md" show={showDelete} onClose={() => setShowDelete()} placement="top">
			<div className={styles.heading}>
				<IcMDelete width={30} height={30} />
			</div>
			<h3 className={styles.heading}>{t('airSchedule:conformation_message_text')}</h3>
			<div className={styles.button_wrapper}>
				<Button
					onClick={() => setShowDelete()}
					themeType="secondary"
					style={{ marginRight: '10px' }}
					disabled={loading}
					type="button"
				>
					{t('airSchedule:cancel_button_text')}
				</Button>
				<Button
					onClick={() => {
						deleteSchedule(schedule?.id);
						setShowDelete(false);
					}}
					disabled={loading}
					type="button"
				>
					{t('airSchedule:delete_button_text')}

				</Button>
			</div>

		</Modal>
	);
}

export default DeleteModal;
