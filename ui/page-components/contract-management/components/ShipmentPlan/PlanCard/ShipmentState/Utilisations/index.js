import { cl } from '@cogoport/components';
import React from 'react';

import { getUnit } from '../../../../../utils/getUnit';

import styles from './styles.module.css';

const getKeysMapping = ({ itemData }) => {
	const {
		max_containers_count = 0,
		booked_containers_count = 0,
		booked_volume = 0,
		max_volume = 0,
		max_weight = 0,
		booked_weight = 0,
	} = itemData || {};

	return {
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
};

function Utilisation({ itemData = {} }) {
	const { service_type = '' } = itemData || {};

	const KEYS_MAPPING = getKeysMapping({ itemData });

	const utilisationCountExceed = Number(KEYS_MAPPING[service_type]?.booked) < Number(KEYS_MAPPING[service_type]?.req);
	const percent = Number(KEYS_MAPPING[service_type]?.booked) / Number(KEYS_MAPPING[service_type]?.req);
	const isOverflow = Number(KEYS_MAPPING[service_type]?.booked) - Number(KEYS_MAPPING[service_type]?.req);

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

				{isEqualAndOvered ? <div className={styles.low_progress} />
					: (
						<div className={cl`${styles.progress} ${isEqualAndOvered ? styles.progress_bg : ''}`}>
							<div className={styles.percentage} style={{ width: barWidth }} />
						</div>
					)}
			</div>
		</div>
	);
}

export default Utilisation;
