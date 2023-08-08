import { Popover } from '@cogoport/components';

import styles from './styles.module.css';

const servicesWithCodes = [
	'fcl_freight',
	'air_freight',
	'fcl_customs',
	'air_customs',
	'haulage_freight',
	'lcl_freight',
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
	'origin_fcl_customs_service',
	'destination_fcl_customs_service',
	'origin_lcl_customs_service',
	'destination_lcl_customs_service',
	'origin_air_customs_service',
	'destination_air_customs_service',
];

function Item({ location = {}, search_type = '' }) {
	const splitDisplayName = (location?.display_name || '').split(',');

	let info =		location?.country?.name
		|| splitDisplayName[splitDisplayName.length - 1]
		|| '';

	if (servicesWithCodes.includes(search_type)) {
		info = `${location?.port_code || location?.postal_code || ''}, ${info}`;
	}

	return (
		<div className={styles.container}>
			<div className={styles.flag} />

			<div className={styles.port_details}>
				<div className={styles.info}>{info}</div>

				<Popover
					placement="bottom"
					theme="light"
					render={
						<div style={{ fontSize: '10px' }}>{location?.name || ''}</div>
					}
				>
					<div className={styles.name}>{location?.name || ''}</div>
				</Popover>
			</div>
		</div>
	);
}

export default Item;
