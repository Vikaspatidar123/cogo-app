import styles from './styles.module.css';

function MobileView({ item = {}, config = [] }) {
	return (
		<div className={styles.container}>
			{(config || []).map((x) => (
				<div key={x.name}>
					<div className={styles.card}>
						<div className={styles.earning}>
							<span className={styles.type}>{`${x.name}:`}</span>
							<div className={styles.key}>{item?.[x.key]}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
export default MobileView;
