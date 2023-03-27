import { Tooltip } from '@cogoport/components';
import {
	IcMPortArrow,
	IcMAirport,
	IcMFlcl,
	IcMShip,
} from '@cogoport/icons-react';
import { isEmpty, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Route({ item = {}, source = '' }) {
	const { destination_detail, origin_detail, search_type } = item || {};
	const isPortEmpty = isEmpty(destination_detail) || isEmpty(origin_detail);

	const searchType = (search_type || '').replace('_freight', '');

	const prefixIcon = {
		fcl : <IcMShip fill="#436DF4" />,
		lcl : <IcMFlcl fill="#436DF4" />,
		air : <IcMAirport fill="#436DF4" />,
	};

	function LocationData({ details }) {
		return (
			<div className={styles.location}>
				<Tooltip placement="top" content={details?.name}>
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

	return isPortEmpty ? (
		<div className={source === 'popover' ? styles.container_popover : styles.container}>
			<div className={styles.card}>
				<div className={styles.para}>No Port Pair Information</div>
			</div>
		</div>
	) : (
		<div className={source === 'popover' ? styles.container_popover : styles.container}>
			<div className={styles.service_type}>
				<div className={styles.icon_container}>{prefixIcon[searchType]}</div>
				<div className={styles.service}>{upperCase(searchType)}</div>
			</div>
			<div className={styles.path}>
				<LocationData details={origin_detail} />
				<IcMPortArrow />
				<LocationData details={destination_detail} />
			</div>
		</div>
	);
}

export default Route;
