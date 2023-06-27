import styles from './styles.module.css';

function PocDetails() {
	return (
		<div className={styles.flexDiv}>
			{[...Array(5).keys()].map((x) => (
				<div className={styles.dataDiv} key={x}>
					<div className={styles.labelText}>
						Name
					</div>
					<div className={styles.valueText}>
						Kunwar Kant
					</div>
				</div>
			))}
		</div>
	);
}

export default PocDetails;
