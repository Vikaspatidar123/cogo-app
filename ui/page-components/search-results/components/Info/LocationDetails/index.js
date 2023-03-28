import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const singleLocation = ['fcl_customs', 'lcl_customs', 'air_customs', 'fcl_cfs'];

function LocationDetails({ data = {} }) {
	const { origin, destination } = getLocationInfo('search_type', data);

	const origin_country = origin?.display_name?.split(', ');
	const destination_country = destination?.display_name?.split(', ');

	const className = singleLocation.includes(data?.search_type) ? 'single' : '';

	return (
		<div className={`${styles.flex_row} ${className}`}>
			<div className={styles.flex_column}>
				<Tooltip placement="top" theme="light" content={origin?.name}>
					<div
						className={`${styles.port} ${destination ? '' : 'full'}`}
						style={{ maxWidth: destination ? '' : '80%' }}
					>
						{origin?.name}
					</div>
				</Tooltip>

				<div className={`${styles.port} ${destination ? 'full-name' : 'full-detail'}`}>
					{`${origin?.port_code ? `${origin?.port_code},` : ''} ${
						origin_country?.pop() || ''
					}`}
				</div>
			</div>

			{destination ? (
				<>
					<div className={styles.icon_wrap}>
						<IcMPortArrow
							style={{ width: '1.5em', height: '1.5em', color: '#356efd' }}
						/>
					</div>

					<div className={styles.flex_column}>
						<Tooltip placement="top" theme="light" content={destination?.name}>
							<div className={styles.port}>{destination?.name}</div>
						</Tooltip>
						<div className={`${styles.port} ${styles.full_name}`}>
							{`${destination?.port_code ? `${destination?.port_code},` : ''} ${
								destination_country?.[2] || ''
							}`}
						</div>
					</div>
				</>
			) : null}
		</div>
	);
}

export default LocationDetails;
