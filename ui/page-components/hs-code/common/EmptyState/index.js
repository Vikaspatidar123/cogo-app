import EmptyIcon from './empty.svg';
import styles from './styles.module.css';

function EmptyState({ drillDwn }) {
	return (
		<div className={drillDwn ? `${styles.drill_dwn}` : `${styles.container}`}>
			<EmptyIcon height="200px" width="200px" />
			<div className={`${styles.h1}`}>Sorry! No result found</div>
			<div className={`${styles.h2}`}>Please try a different keyword/HS Code for better result.</div>
		</div>
	);
}

export default EmptyState;
