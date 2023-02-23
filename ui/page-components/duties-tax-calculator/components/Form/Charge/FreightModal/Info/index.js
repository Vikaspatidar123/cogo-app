import { Tooltip } from '@cogoport/components';
import { IcMShip, IcMAirport, IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Info({ transportMode, portDetails }) {
	const { origin = '', destination = '' } = portDetails || {};

	const renderName = (name) => {
		if (name.length > 16) {
			return (
				<Tooltip theme="light-border" content={name}>
					<div className="tooltipName">
						{' '}
						{name.slice(0, 16)}
						...
					</div>
				</Tooltip>
			);
		}

		return name;
	};
	return (
		<div className={styles.row}>
			<div className={`${styles.col} ${styles.transport_details}`}>
				<div>
					{transportMode === 'OCEAN' ? (
						<IcMShip width={22} height={22} fill="#034AFD" />
					) : (
						<IcMAirport width={22} height={22} fill="#EF9B9B" />
					)}
				</div>
				<div className={styles.transport}>{transportMode}</div>
			</div>
			<div className={`${styles.row} ${styles.section}`}>
				<div className={`${styles.col} ${styles.port_detail}`}>
					<div className={styles.port_name}>{renderName(origin?.name)}</div>
					<IcMPortArrow width={15} height={15} />
					<div className={styles.port_name}>{renderName(destination?.name)}</div>
				</div>
				{transportMode === 'OCEAN' ? (
					<div className={styles.col}>
						<div className={styles.tag}>20FT</div>
						<div className={styles.tag}>Standard (Dry)</div>
						<div className={styles.tag}>Qty: 1</div>
					</div>
				) : (
					<div className={`${styles.col} ${styles.air}`}>
						<div className={styles.tag}>Box</div>
						<div className={styles.tag}>Stackable</div>
						<div className={styles.tag}>Wt: 1</div>
						<div className={styles.tag}>Vol: 1</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Info;
