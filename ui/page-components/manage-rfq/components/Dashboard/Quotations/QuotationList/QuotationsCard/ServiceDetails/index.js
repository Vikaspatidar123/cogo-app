import { IcMShip, IcMFlcl, IcMAirport } from '@cogoport/icons-react';

import { getSerivceUnit } from '../../../../../../helpers/getUnit';

import styles from './styles.module.css';

function ServiceDetails({ rfqItem, activeFilter }) {
	const isDraft = !['draft', 'is_expired'].includes(...activeFilter);

	const { port_pair_count } = rfqItem || {};

	const countMapping = {
		fcl_freight : 'containers_count',
		lcl_freight : 'total_volume',
		air_freight : 'total_weight',
	};

	const serviceDetails = Object.keys(port_pair_count || {}).map((key) => ({
		service         : key,
		rates_available : port_pair_count[key].rates_available || 0,
		total_rates     : port_pair_count[key]?.total || 0,
		count           : port_pair_count[key][countMapping[key]] || 0,
	}));

	const ServiceIcon = {
		fcl_freight : <IcMShip fill="#436DF4" />,
		lcl_freight : <IcMFlcl fill="#436DF4" />,
		air_freight : <IcMAirport fill="#436DF4" />,
	};

	return (
		<div className={styles.container}>
			{serviceDetails.map((item) => (
				<div className={styles.services}>
					<div className={styles.service_type}>
						<div className={styles.icon_container}>{ServiceIcon[item.service]}</div>
						<div className={styles.service}>{item.service.split('_')[0]}</div>
					</div>
					<div className={styles.section}>
						{item.total_rates}
						{' '}
						Port Pairs
					</div>

					{isDraft && (
						<div className={styles.section}>
							{item.rates_available}
							{' '}
							/
							{item.total_rates}
							{' '}
							Rates Available
						</div>
					)}

					<div className={styles.section}>
						{item.count}
						{' '}
						{getSerivceUnit(item.service)}
					</div>
				</div>
			))}
		</div>
	);
}

export default ServiceDetails;
