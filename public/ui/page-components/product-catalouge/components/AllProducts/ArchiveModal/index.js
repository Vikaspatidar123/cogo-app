import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ArchiveModal({ archive, setArchive, refetchArchive }) {
	const { t } = useTranslation(['common', 'productCatalogue']);

	return (
		<Modal className={styles.modal_div} show={archive} onClose={() => setArchive(false)}>
			<div className={styles.container}>
				<div className={styles.icon_div}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.archive_icon}
						alt={t('productCatalogue:product_catalogue_icon_alt_text')}
						height={70}
						width={70}
					/>
				</div>
				<div className={styles.heading}>{t('productCatalogue:product_catalogue_add_archive_modal_text_1')}</div>
				<div className={styles.text}>{t('productCatalogue:product_catalogue_add_archive_modal_text_2')}</div>
			</div>
			<div className={styles.button_div}>
				<Button
					themeType="secondary"
					className={styles.secondary_button}
					onClick={() => setArchive(false)}
				>
					{t('productCatalogue:product_catalogue_add_archive_modal_button_label_2')}

				</Button>
				<Button
					className={styles.primary_button}
					onClick={() => {
						refetchArchive();
					}}
				>
					{t('productCatalogue:product_catalogue_add_archive_modal_button_label_1')}
				</Button>
			</div>
		</Modal>
	);
}

export default ArchiveModal;
