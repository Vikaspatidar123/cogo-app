import styles from './styles.module.css';

function Section2({ viewQuoteData = {} }) {
	return (
		<>

			<div className={styles.incoterm}>
				<p className={styles.text}>
					<b>Incoterm: </b>
					{viewQuoteData.incoterm}
				</p>
			</div>
			<div className={styles.icons}>
				<img className={styles.origin} src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/svg.svg" alt="cogo" />
				<img className={styles.img} src="https://cogoport-production.sgp1.digitaloceanspaces.com/df6934846ee83d2177bb7e53981fb2f2/MicrosoftTeams-image%20%285%29.png" />
				<img className={styles.destination} src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/svg.svg" alt="cogo" />
			</div>
			<div className={styles.icon2}>
				<div className={styles.Morro}>{viewQuoteData.originPortName}</div>
				<div className={styles.ocean_text}>
					<div className={styles.ocean_box1}>
						<p className={styles.ocean_text}>OCEAN</p>

					</div>
					<div className={styles.ocean_box1}>
						<p className={styles.ocean_text}>FCL</p>

					</div>
				</div>
				<div className={styles.location}>{viewQuoteData.destinationPortName}</div>

			</div>

		</>
	);
}
export default Section2;
