import styles from './styles.module.css';

function Elgibility() {
	return (
		<div className={styles.header}>
			<div className={styles.first}>
				<div className={styles.top} />
				<div className={styles.body}>
					ship Now,
					<span className={styles.blue}>Pay Later</span>
					Easily apply online in just a few minutes
				</div>
				<div className={styles.mainBody}>
					<div className={styles.sub}>
						<img
							className={styles.img}
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/newadd.svg"
							alt="img"
						/>

					</div>
					<p className={styles.text}>
						Pay up to 90 days later for shipments, local
						transport, and other trade services without additional charges.
					</p>

				</div>
				<div className={styles.Bottom}>
					<button className={styles.button}>CHECK ELGIBILITY NOW</button>

				</div>
			</div>
		</div>
	);
}
export default Elgibility;
