import DataTable from './DataTable';
import styles from './styles.module.css';
import Tools from './Tools';

function InfoContainer() {
	return (
		<div className={styles.container}>
			<div className={styles.data_table}>
				<DataTable />
			</div>
			<div className={styles.tools}>
				<Tools />
			</div>
		</div>
	);
}
export default InfoContainer;
