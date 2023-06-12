import styles from './styles.module.css';

function Line() {
	return (
		<div className={styles.container}>
			<div className={styles.dot} />
			<div className={styles.style_line} />
		</div>
	);
}
export default Line;
