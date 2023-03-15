import styles from './styles.module.css';

function Line() {
	return (
		<div className={styles.container}>
			<div className={styles.dot} />
			<div className={styles.line} />
		</div>
	);
}
export default Line;
