import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function HyperLink({ setShowCatalogue, setShowHsCodeModal }) {
	const { t } = useTranslation(['importExportDoc']);
	return (
		<div className={styles.container}>
			<div className={styles.or_tag}>
				<div className={styles.line} />
				<div className={styles.text}>OR</div>
				<div className={styles.line} />
			</div>
			<div className={styles.other}>
				<div
					className={styles.hyper_link}
					role="presentation"
					onClick={() => setShowCatalogue(true)}
				>
					{t('importExportDoc:hyperlink_product_catalogue')}
				</div>
				<div className={styles.divider} />
				<div
					className={styles.hyper_link}
					role="presentation"
					onClick={() => setShowHsCodeModal(true)}
				>
					{t('importExportDoc:hyperlink_hscode')}
				</div>
			</div>
		</div>
	);
}

export default HyperLink;
