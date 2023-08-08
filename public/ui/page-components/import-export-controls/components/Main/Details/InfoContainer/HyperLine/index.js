import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function HyperLink({
	setShowCatalogue,
	setShowHsCodeModal,
	setIsImportHs,
	name,
}) {
	const { t } = useTranslation(['importExportControls']);
	const catalogueHandler = () => {
		setShowCatalogue(true);
		setIsImportHs(name === 'importHsCode');
	};

	const hsHandler = () => {
		setShowHsCodeModal(true);
		setIsImportHs(name === 'importHsCode');
	};
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
					onClick={catalogueHandler}
				>
					{t('importExportControls:hyperlink_product_catalogue')}
				</div>
				<div className={styles.divider} />
				<div className={styles.hyper_link} role="presentation" onClick={hsHandler}>
					{t('importExportControls:hyperlink_hscode')}
				</div>
			</div>
		</div>
	);
}

export default HyperLink;
