import styles from './styles.module.css';

function Empty({ width, height, shadow = true }) {
	return (
		<div className={styles.container} width={width} height={height}>
			{width ? <div style={{ width }} /> : <div className={styles.width} /> }
			{height ? <div style={{ height }} /> : <div className={styles.height} /> }
			{shadow ? <div className={styles.shadow} /> : ''}
			<div className={styles.heading}>No Promocodes Available </div>
		</div>
	);
}

export default Empty;
