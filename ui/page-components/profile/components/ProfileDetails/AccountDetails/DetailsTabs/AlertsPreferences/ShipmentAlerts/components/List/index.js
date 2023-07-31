import ReportList from './ReportList';
import Schedule from './Schedule';
import styles from './styles.module.css';

function List({ props }) {
	return (
		<div className={styles.container}>
			<ReportList props={props} />
			<Schedule props={props} />
		</div>
	);
}

export default List;
