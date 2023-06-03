import styles from './styles.module.css';

function Commodity() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Select Commodity</h3>
			</div>
			<div className={styles.form_container} />
		</div>
	);
}

export default Commodity;
