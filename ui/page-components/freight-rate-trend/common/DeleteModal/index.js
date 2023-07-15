import { Modal } from '@cogoport/components';
import { IcMTick, IcMCross, IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function DeleteModal({
	showDeleteModal,
	setShowDeleteModal,
	trendId,
	deleteTrend,
}) {
	const { t } = useTranslation(['frt']);
	return (
		<Modal
			size="sm"
			show={showDeleteModal}
			onClose={() => setShowDeleteModal(false)}
			onOuterClick={() => setShowDeleteModal(false)}
			closable={false}
		>
			<Modal.Body>
				<div className={styles.icon_container}>
					<IcMDelete width={50} height={50} />
				</div>
				<div className={styles.txt}>{t('frt:delete_modal_title')}</div>
				<div className={styles.footer}>
					<div
						className={styles.no}
						role="presentation"
						onClick={() => {
							setShowDeleteModal(false);
						}}
					>
						<IcMCross width={30} height={30} />
					</div>
					<div
						className={styles.yes}
						role="presentation"
						onClick={() => {
							deleteTrend(trendId);
							setShowDeleteModal(false);
						}}
					>
						<IcMTick width={35} height={35} />
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteModal;
