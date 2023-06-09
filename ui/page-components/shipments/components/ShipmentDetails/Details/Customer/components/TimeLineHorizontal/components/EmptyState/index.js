import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-results.svg"
				alt="empty"
				style={{ width: 150, height: 'auto', marginBottom: 10 }}
			/>

			<div className={styles.text}>Locating your cargo</div>

			<div className={`${styles.text} ${styles.detail}`}>
				Tracker, once created, keeps fetching updates automatically. Visit your
				tracker anytime to see the latest status updates
			</div>
		</div>
	);
}

export default EmptyState;
