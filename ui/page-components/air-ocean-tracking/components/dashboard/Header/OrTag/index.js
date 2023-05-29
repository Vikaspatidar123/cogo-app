import styles from './styles.module.css';

function OrTag() {
	return (
		<div className={styles.container}>
			<div className={styles.line} />
			<div>OR</div>
			<div className={styles.line} />
		</div>
	);
}

export default OrTag;
