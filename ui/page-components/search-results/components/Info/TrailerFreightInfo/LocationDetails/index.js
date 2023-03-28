import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function LocationDetails({ data }) {
	const { origin_location, destination_location } = data;
	return (
		<div className={styles.location_details_div}>
			<Tooltip
				theme="light"
				animation="shift-away"
				interactive
				content={origin_location?.port_code || origin_location?.name}
			>
				<div className={styles.port}>{origin_location?.port_code || origin_location?.name}</div>
			</Tooltip>

			<div className={styles.trip_type}>
				<div className={styles.icon_wrap}>
					<div className={styles.Circle} />
					<div className={styles.dotted_line} />
					<div className={styles.Circle} />
				</div>
			</div>

			<Tooltip
				theme="light"
				animation="shift-away"
				interactive
				content={destination_location?.port_code || destination_location?.name}
			>
				<div className={styles.port}>
					{destination_location?.port_code || destination_location?.name}
				</div>
			</Tooltip>
		</div>
	);
}

export default LocationDetails;
