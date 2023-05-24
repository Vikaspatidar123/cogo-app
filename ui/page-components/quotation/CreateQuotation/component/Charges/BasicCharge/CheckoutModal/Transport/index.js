import { cl, Pill } from '@cogoport/components';
import { IcMLocation, IcMShip, IcMAirport } from '@cogoport/icons-react';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Transport({ transportMode = 'OCEAN', consignmentValue }) {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Transportation Details</h3>

			<div className={styles.info_container}>
				<div className={styles.flex_box}>
					<span className={styles.location_icon}>
						<IcMLocation width={25} height={25} />
					</span>
					{transportMode === 'OCEAN' ? (
						<IcMShip width={25} height={25} />
					) : (
						<IcMAirport width={25} height={25} />
					)}
					<span className={styles.location_icon}>
						<IcMLocation width={25} height={25} />
					</span>
				</div>
				<div className={cl`${styles.flex_box} ${styles.line_container}`}>
					<div className={styles.dot} />
					<div className={styles.line} />
					<div className={styles.dot} />
				</div>
				<div className={styles.flex_box}>
					<p className={styles.port_name}>Mundra</p>
					<Pill color="orange" size="sm">Incoterm: FOB</Pill>
					<p className={styles.port_name}>Jebel Ali</p>
				</div>
			</div>
			<div className={styles.total_amount}>
				<div className={styles.value}>
					{formatAmount({
						amount   : consignmentValue,
						currency : 'IMR',
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							notation              : 'standard',
							maximumFractionDigits : 2,
						},
					})}
				</div>
				<div className={styles.border} />
			</div>
		</div>
	);
}

export default Transport;
