import styles from './styles.module.css';

function EmptyState() {
	return (
		<div>
			<img
				className={styles.empty_state}
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
				width={270}
				height={270}
				alt="No Data Found"
			/>
		</div>
	);
}

export default EmptyState;
