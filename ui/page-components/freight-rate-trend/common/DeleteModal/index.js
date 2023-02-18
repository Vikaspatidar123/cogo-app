import { Modal } from '@cogoport/components';
import { IcMTick, IcMCross, IcMDelete } from '@cogoport/icons-react';

import styles from './style.modules.css';

function DeleteModal({
	showDeleteModal,
	setShowDeleteModal,
	trendId,
	deleteTrend,
	isMobile,
}) {
	return (
		<Modal
			show={showDeleteModal}
			onClose={() => setShowDeleteModal(false)}
			onOuterClick={() => setShowDeleteModal(false)}
			width={isMobile ? 300 : 400}
			closable={false}
		>
			<div className={styles.icon_container}>
				<IcMDelete width={50} height={50} />
			</div>
			<div className={styles.Txt}>Are you sure to delete this Freight Rate Trend ?</div>
			<div className={styles.footer}>
				<div
					className="icon_container no"
					role="presentation"
					onClick={() => {
						setShowDeleteModal(false);
					}}
				>
					<IcMCross width={30} height={30} />
				</div>
				<div
					className="icon_container yes"
					role="presentation"
					onClick={() => {
						deleteTrend(trendId);
					}}
				>
					<IcMTick width={35} height={35} />
				</div>
			</div>
		</Modal>
	);
}

export default DeleteModal;
