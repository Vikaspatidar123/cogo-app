import Details from './Details';
import styles from './styles.module.css';
import Transportation from './Transportation';

function AllDetails({ transportMode = 'OCEAN' }) {
	return (
		<div className={styles.container}>
			<div className={styles.map}>
				{/* maps */}
			</div>
			<div className={styles.transport}>
				<Transportation />
			</div>
			<div className={styles.details}>
				<Details transportMode={transportMode} />
			</div>
		</div>
	);
}

export default AllDetails;
