import Head from './Head';
import styles from './styles.module.css';
import Table from './Table';

function ReportList(props) {
	return (
		<div className={styles.container}>
			<Head {...props} />
			<Table {...props} />
		</div>
	);
}

export default ReportList;
