import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function LocationDetails({ data }) {
	const { origin_country, destination_country } = data;

	return (
		<div className={styles.location_details_div}>
			<Tooltip
				theme="light"
				animation="shift-away"
				interactive
				content={origin_country?.display_name || origin_country?.name}
			>
				<div className={styles.port}>{origin_country?.display_name || origin_country?.name}</div>
			</Tooltip>

			<div className={styles.icon_wrap}>
				<IcMPortArrow
					style={{ width: '1.5em', height: '1.5em', color: '#356efd' }}
				/>
			</div>

			<Tooltip
				theme="light"
				animation="shift-away"
				interactive
				content={destination_country?.display_name || destination_country?.name}
			>
				<div className={styles.port}>
					{destination_country?.display_name || destination_country?.name}
				</div>
			</Tooltip>
		</div>
	);
}

export default LocationDetails;
