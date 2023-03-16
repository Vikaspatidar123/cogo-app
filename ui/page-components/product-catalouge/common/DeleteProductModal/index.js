import { Modal } from '@cogoport/components';
import { IcMTick, IcMCross, IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DeleteProductModal({
	showDeleteModal,
	setShowDeleteModal,
	deleteProduct = () => {},
	productId = '',
	productClassificationId,
	card = false,
	subCategoryCount = 0,
}) {
	return (
		<Modal
			show={showDeleteModal}
			onClose={() => setShowDeleteModal(false)}
			onOuterClick={() => setShowDeleteModal(false)}
		>
			<div className={styles.icon_container}>
				<IcMDelete width={50} height={50} />
			</div>
			<h2 className={styles.txt}>This would delete the product from Catalogue</h2>
			<div className={styles.footer}>
				<div
					className="iconContainer no"
					role="presentation"
					onClick={() => {
						setShowDeleteModal(false);
					}}
				>
					<IcMCross width={30} height={30} />
				</div>
				<div
					className="iconContainer yes"
					role="presentation"
					onClick={() => {
						deleteProduct({
							productId,
							productClassificationId,
							card,
							subCategoryCount,
						});
						setShowDeleteModal(false);
					}}
				>
					<IcMTick width={35} height={35} />
				</div>
			</div>
		</Modal>
	);
}

export default DeleteProductModal;
