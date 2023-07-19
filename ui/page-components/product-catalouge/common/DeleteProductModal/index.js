import { Modal, cl } from '@cogoport/components';
import { IcMTick, IcMCross, IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['productCatalogue']);
	return (
		<Modal
			show={showDeleteModal}
			onClose={() => setShowDeleteModal(false)}
			onOuterClick={() => setShowDeleteModal(false)}
		>
			<div className={styles.icon_container}>
				<IcMDelete width={50} height={50} />
			</div>
			<h2 className={styles.txt}>{t('productCatalogue:product_catalogue_delete_product_modal_text_1')}</h2>
			<div className={styles.footer}>
				<div
					className={cl`${styles.icon_container} ${styles.no}`}
					role="presentation"
					onClick={() => {
						setShowDeleteModal(false);
					}}
				>
					<IcMCross width={30} height={30} />
				</div>
				<div
					className={cl`${styles.icon_container} ${styles.yes}`}
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
