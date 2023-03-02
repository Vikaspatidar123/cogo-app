import styles from './styles.module.css';

function Card({ summary }) {
	const {
		name = '',
		icon = '',
		iconColor = '',
		background = '',
		value = '',
	} = summary || {};
	return (
		<div className={styles.container} style={{ background }}>
			<div className={styles.iconContainer} style={{ background: iconColor }}>
				{icon}
			</div>
			<div className={styles.info}>
				<p className={styles.text}>{name}</p>
				<p className={`${styles.text} ${styles.value}`}>{value}</p>
			</div>
		</div>
	);
}

export default Card;
