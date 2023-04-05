import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Elgibility() {
	return (
		<div className={styles.header}>
			<div className={styles.body}>
				Ship Now,
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
				<Button className={styles.button}>CHECK ELGIBILITY NOW</Button>
			</div>
		</div>
	);
}
export default Elgibility;
