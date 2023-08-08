import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function HyperLink({ setShowCatalogue, setShowHsCodeModal }) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);

	return (
		<div className={styles.container}>
			<div className={styles.or_tag}>
				<div className={styles.line} />
				<div className={styles.text}>OR</div>
				<div className={styles.line} />
			</div>
			<div className={styles.other}>
				<div
					className={styles.hyperlink}
					role="presentation"
					onClick={() => setShowCatalogue(true)}
				>
					{t('dutiesTaxesCalculator:form_product_hyperlink_product')}
				</div>
				<div className={styles.divider} />
				<div
					className={styles.hyperlink}
					role="presentation"
					onClick={() => setShowHsCodeModal(true)}
				>
					{t('dutiesTaxesCalculator:form_product_hyperlink_hscode')}
				</div>
			</div>
		</div>
	);
}

export default HyperLink;
