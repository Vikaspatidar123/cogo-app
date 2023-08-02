import Details from './Details';
import styles from './styles.module.css';

function Schedule({ props }) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>SSR Schedule</div>
			<Details props={props} />
		</div>
	);
}

export default Schedule;
