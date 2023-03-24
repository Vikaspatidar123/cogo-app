import { Tooltip } from '@cogoport/components';
import { IcMFtick, IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Route({
	index,
	selectedData,
	detail = {},
	spotSearchId,
	source = '',
}) {
	const { destination_port, origin_port, destination_airport, origin_airport } =		detail || {};

	function LocationDetails({ details }) {
		return (
			<div className={styles.location}>
				<Tooltip content={details?.display_name} theme="light-border">
					<div className={styles.name}>
						<div className={styles.port}>{details?.name}</div>
						{' '}
						<div className={styles.code}>
							(
							{details?.port_code}
							)
						</div>
					</div>
				</Tooltip>
				<div className={styles.country}>{(details?.display_name || '').split(',')[2]}</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.index_container}>
				{!source
					&& (selectedData[spotSearchId] ? (
						<IcMFtick className={styles.tickicon} />
					) : (
						<div className={styles.index_list}>{index + 1}</div>
					))}
				{source && <div className={styles.index_list}>{index + 1}</div>}
			</div>
			<LocationDetails details={origin_port || origin_airport || {}} />
			<IcMPortArrow className={styles.arrowicon} />
			<LocationDetails
				details={destination_port || destination_airport || {}}
			/>
		</div>
	);
}

export default Route;
