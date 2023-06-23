import styles from './styles.module.css';

function EmptyRateCard() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Rates have been requested for this requirement</div>
			<div className={styles.para}>
				It may take approximately 24 hrs to fetch this rates. Meanwhile you can
				proceed to request contracts for other port pairs.
			</div>
		</div>
	);
}

export default EmptyRateCard;
