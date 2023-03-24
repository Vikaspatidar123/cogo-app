import styles from './styles.module.css';

function TermsConditions({ terms }) {
	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{terms.map((term) => (
					<div className={styles.item} key={term.message}>{term.message}</div>
				))}
			</div>
		</div>
	);
}

export default TermsConditions;
