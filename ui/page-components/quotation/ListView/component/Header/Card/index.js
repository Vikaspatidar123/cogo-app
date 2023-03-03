import iconUrl from '../../../../utils/iconUrl.json';

import styles from './styles.module.css';

function Card({ summary = {}, loading = false }) {
	const {
		name = '',
		icon = '',
		iconColor = '',
		background = '',
		value = 0,
	} = summary || {};
	return (
		<div className={styles.container} style={{ background }}>
			<div className={styles.iconContainer} style={{ background: iconColor }}>
				{icon}
			</div>
			<div className={styles.info}>
				<p className={styles.text}>{name}</p>
				{!loading && <p className={`${styles.text} ${styles.value}`}>{value}</p>}
				{loading && <img src={iconUrl.loading} alt="loading..." className={styles.loading} />}
			</div>
		</div>
	);
}

export default Card;
