import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const singleLocationServices = [
	'fcl_freight_local',
	'air_freight_local',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
];

const TRADE_TYPE_MAPPING = {
	export : 'Origin',
	import : 'Destination',
};

function RouteDisplay({
	trade_type,
	mode,
	origin,
	destination,
	port,
	type,
	source,
	rate,
}) {
	const isSingleLocationService = singleLocationServices.includes(mode);

	const renderLocation = (location) => {
		const sub =			location?.type === 'pincode'
			? location?.postal_code
			: location?.port_code;

		return (
			<div className={styles.location}>
				<div className={styles.port_name}>
					<div>{location?.name}</div>
&nbsp;
					{sub && (
						<div className={styles.sub_name}>
							(
							{sub}
							)
						</div>
					)}
				</div>
				<div className={styles.country_name}>
					<div>
						{' '}
						{location?.countryName}
						{' '}
					</div>
				</div>
			</div>
		);
	};

	if (isSingleLocationService) {
		return (
			<div className={`${styles.container} ${type} ${source} single-location`}>
				{renderLocation(port)}
				<div className={styles.service_type}>
					{startCase(mode)}
					{' '}
					At
					{' '}
					{TRADE_TYPE_MAPPING[trade_type]}
				</div>
			</div>
		);
	}

	return (
		<div style={{ position: 'relative' }}>
			{rate?.source === 'cogo_assured_rate' ? (
				<div className={styles.cogo_assured_image}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo-assured-icon.svg"
						alt="cogo-logo"
						width={200}
						height={40}
					/>
				</div>
			) : null}

			<div className={`${styles.container} ${type} ${source}`}>
				{renderLocation(origin)}

				<div className={styles.icon_div}>
					<IcMPortArrow width={24} height={20} />
				</div>

				{renderLocation(destination)}
			</div>
		</div>
	);
}

export default RouteDisplay;
