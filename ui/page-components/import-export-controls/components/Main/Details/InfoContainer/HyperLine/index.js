import styles from './styles.module.css';

function HyperLink({
	setShowCatalogue,
	setShowHsCodeModal,
	setIsImportHs,
	name,
}) {
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
					Add via Product Catalogue
				</div>
				<div className={styles.divider} />
				<div className={styles.hyper_link} role="presentation" onClick={hsHandler}>
					Add via HS Code
				</div>
			</div>
		</div>
	);
}

export default HyperLink;
