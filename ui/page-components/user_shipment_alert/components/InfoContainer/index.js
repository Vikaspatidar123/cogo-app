import DataTable from './DataTable';
import styles from './styles.module.css';
import Tools from './Tools';

function InfoContainer({ setShow, showTitleType }) {
	return (
		<div className={styles.container}>
			<div className={styles.data_table}>
				<DataTable setShow={setShow} showTitleType={showTitleType} />
			</div>
			<div className={styles.tools}>
				<Tools />
			</div>
		</div>
	);
}
export default InfoContainer;
