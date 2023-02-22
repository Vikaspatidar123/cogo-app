import styles from './styles.module.css';

function HyperLink({ setShowCatalogue, setShowHsCodeModal }) {
	return (
		<div className={styles.container}>
			<div className={styles.orTag}>
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
					Add via Product Catalogue
				</div>
				<div className={styles.divider} />
				<div
					className={styles.hyperlink}
					role="presentation"
					onClick={() => setShowHsCodeModal(true)}
				>
					Add via HS Code
				</div>
			</div>
		</div>
	);
}

export default HyperLink;
