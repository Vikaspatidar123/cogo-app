import { Tooltip } from '@cogoport/components';
import { IcMShip, IcMAirport, IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const NAME_MAX_LENGTH = 14;
const START_INDEX = 0;

function RenderName({ name = '' }) {
	if (name?.length < NAME_MAX_LENGTH) return <span>{name}</span>;

	return (
		<Tooltip content={name}>
			<div className={styles.tooltip_name}>
				{' '}
				{name?.slice(START_INDEX, NAME_MAX_LENGTH)}
				...
			</div>
		</Tooltip>
	);
}

function Info({ transportMode, portDetails }) {
	const {
		origin_port = {},
		origin_airport = {},
		destination_port = {},
		destination_airport = {},
		container_size = 0,
		containers_count = 0,
		packages_count = 0,
		packages = {},
	} = portDetails || {};

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
					<div className={styles.port_name}>
						<RenderName name={origin_port?.display_name || origin_airport?.display_name} />
					</div>
					<IcMPortArrow width={15} height={15} />
					<div className={styles.port_name}>
						<RenderName name={destination_port?.display_name || destination_airport?.display_name} />
					</div>
				</div>

				{transportMode === 'OCEAN' ? (
					<div className={styles.col}>
						<div className={styles.tag}>
							{container_size}
							FT
						</div>
						<div className={styles.tag}>{startCase(portDetails?.container_type)}</div>
						<div className={styles.tag}>
							Qty:
							{containers_count || packages_count}

						</div>
					</div>
				) : (
					<div className={`${styles.col} ${styles.air}`}>
						<div className={styles.tag}>{packages?.[0]?.handling_type?.toUpperCase()}</div>
						{/* <div className={styles.tag}>Stackable</div> */}
						<div className={styles.tag}>
							Qty:
							{containers_count || packages_count}

						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Info;
