import ReportList from './ReportList';
import styles from './styles.module.css';

function List({ props }) {
	return (
		<div className={styles.container}>
			<ReportList props={props} />
		</div>
	);
}

export default List;
