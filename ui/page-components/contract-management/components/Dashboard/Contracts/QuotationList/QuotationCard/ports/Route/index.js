import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

import { SERVICE_ICON_MAPPING } from '../../../../../../../configurations/service-icon-mapping';
import { getSubUnit } from '../../../../../../../utils/getUnit';

import styles from './styles.module.css';

function Route({ val, source }) {
	const {
		service_type = '',
		origin = {},
		destination = {},
		booked_containers_count = 0,
		max_containers_count = 0,
		max_volume = 0,
		booked_volume = 0,
		max_weight = 0,
		booked_weight = 0,
		trade_type = '',
	} = val || {};

	const containersLeft = max_containers_count - booked_containers_count;
	const weightLeft = max_weight - booked_weight;
	const volumeLeft = max_volume - booked_volume;

	const getCount = containersLeft || weightLeft || volumeLeft;
	const { name = '', port_code = '', display_name = '' } = origin || {};
	const {
		name: destinationName = '',
		port_code: destinationPortCode = '',
		display_name: destinationDisplay = '',
	} = destination || {};

	const countryName = (item) => item?.split(',').slice(-1)[0];
	const width = source === 'modal' ? '100%' : '32%';
	return (
		<div className={styles.container} style={{ width }}>
			<div className={styles.header}>
				<div className={styles.service_icon}>{SERVICE_ICON_MAPPING[service_type]}</div>
				<div className={styles.service}>{upperCase(service_type).slice(0, 3)}</div>
				{trade_type && <div className={styles.tag}>{startCase(trade_type)}</div>}
			</div>
			<div className={styles.port_pair}>
				<div className={styles.location}>
					<div className={styles.name}>
						<div className={styles.port}>{name}</div>
						<div className={styles.code}>
							(
							{port_code}
							)
						</div>
					</div>
					<div className={styles.Country}>{startCase(countryName(display_name))}</div>
				</div>
				<IcMPortArrow />
				<div className={styles.location}>
					<div className={styles.name}>
						<div className={styles.port}>{destinationName}</div>
						<div className={styles.code}>
							(
							{destinationPortCode}
							)
						</div>
					</div>
					<div className={styles.Country}>{startCase(countryName(destinationDisplay))}</div>
				</div>
			</div>
			<div className={styles.actions}>
				<div className={styles.container_left}>
					{Math.abs(getCount)}
					{' '}
					{getSubUnit(service_type)}
					{' '}
					{getCount < 0 ? 'Over Utilized' : 'left'}
				</div>
			</div>
		</div>
	);
}

export default Route;
