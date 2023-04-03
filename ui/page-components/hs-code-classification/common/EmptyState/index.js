import styles from './styles.module.css';

function EmptyState({ drillDwn }) {
	return (
		<div className={drillDwn ? `${styles.drill_dwn}` : `${styles.container}`}>
			<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty-Icon.svg" alt="Emoty" />
			<div className={`${styles.h1}`}>Sorry! No result found</div>
			<div className={`${styles.h2}`}>Please try a different keyword/HS Code for better result.</div>
		</div>
	);
}

export default EmptyState;
