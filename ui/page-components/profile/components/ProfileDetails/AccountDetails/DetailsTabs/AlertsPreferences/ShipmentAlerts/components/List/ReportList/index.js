import Head from './Head';
import styles from './styles.module.css';
import Table from './Table';

function ReportList() {
	return (
		<div className={styles.container}>
			<Head />
			<Table />
		</div>
	);
}

export default ReportList;
