import { format, upperCase } from '@cogoport/utils';
import React from 'react';

import { SERVICE_ICON_MAPPING } from '../../../../../../configurations/service-icon-mapping';
import { getSerivceUnit } from '../../../../../../utils/getUnit';

import styles from './styles.module.css';

function ServiceDetails({ item }) {
	const {
		services = '',
		overseas_port_pairs_count = {},
		contract_utilisation_data = [],
		validity_start = '',
		validity_end = '',
	} = item || {};
	return (
		<div className={styles.container}>
			{(services || []).map((serviceType) => {
				const getCount = contract_utilisation_data?.filter(
					(x) => x.service_type === serviceType,
				)[0];
				const {
					max_containers_count = '',
					max_volume = '',
					max_weight = '',
				} = getCount || {};

				const count = max_containers_count || max_volume || max_weight;
				return (
					<div className={styles.card}>
						<div className={styles.service_icon}>{SERVICE_ICON_MAPPING[serviceType]}</div>
						{serviceType && (
							<div className={styles.service_name}>{upperCase(serviceType).slice(0, 3)}</div>
						)}
						<div className={styles.validity}>
							Validity:
							{' '}
							<span>
								{format(validity_start, 'dd MMM')}
								{' '}
								to
								{' '}
								{format(validity_end, 'dd MMM')}
							</span>
						</div>
						<div className={styles.tag}>
							{overseas_port_pairs_count[serviceType]}
							{' '}
							Port Pairs
						</div>
						{count && (
							<div className={styles.tag}>
								{count}
								{' '}
								{getSerivceUnit(serviceType)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default ServiceDetails;
