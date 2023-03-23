import React from 'react';

import { getUnit } from '../../../../../utils/getUnit';

import styles from './styles.module.css';

function Utilisation({ itemData = {} }) {
	const {
		max_containers_count = 0,
		booked_containers_count = 0,
		booked_volume = 0,
		service_type = '',
		max_volume = 0,
		max_weight = 0,
		booked_weight = 0,
	} = itemData || {};

	const KEYS_MAPPING = {
		fcl_freight: {
			req    : max_containers_count || 0,
			booked : booked_containers_count || 0,
		},
		lcl_freight: {
			req    : max_volume || 0,
			booked : booked_volume || 0,
		},
		air_freight: {
			req    : max_weight || 0,
			booked : booked_weight || 0,
		},
	};

	const utilisationCountExceed =		Number(KEYS_MAPPING[service_type]?.booked)
		< Number(KEYS_MAPPING[service_type]?.req);
	const percent =		Number(KEYS_MAPPING[service_type]?.booked)
		/ Number(KEYS_MAPPING[service_type]?.req);
	const isOverflow =		Number(KEYS_MAPPING[service_type]?.booked)
		- Number(KEYS_MAPPING[service_type]?.req);

	const isEqualAndOvered = utilisationCountExceed < percent && isOverflow !== 0;
	const barWidth = isEqualAndOvered ? `${isOverflow}px` : `${percent * 250}px`;

	return (
		<div className={styles.container}>
			<div className={styles.progress_container}>
				<div className={styles.stats}>
					<div className={styles.contract_title}>
						{KEYS_MAPPING[service_type]?.booked
						> KEYS_MAPPING[service_type]?.req
							? 'Over'
							: getUnit(service_type)}
						{' '}
						Utilisation
					</div>
					{service_type && (
						<div className={styles.utilisation_count}>
							{KEYS_MAPPING[service_type]?.booked?.toFixed(0)}
							/
							{KEYS_MAPPING[service_type]?.req?.toFixed(0)}
						</div>
					)}
				</div>
				{console.log(barWidth, isEqualAndOvered, 'barWidth')}
				{ isEqualAndOvered ? <div className={styles.low_progress} />
					: (
						<div className={styles.progress} overflow={isEqualAndOvered}>
							<div className={styles.percentage} barWidth={barWidth} />
						</div>
					)}
			</div>
		</div>
	);
}

export default Utilisation;
