import styles from './styles.module.css';

function TermsConditions({ terms }) {
	return (
		<div className={styles.container}>
			<ul className={styles.list}>
				{terms.map((term) => (
					<li className={styles.item} key={term.message}>{term.message}</li>
				))}
			</ul>
		</div>
	);
}

export default TermsConditions;
