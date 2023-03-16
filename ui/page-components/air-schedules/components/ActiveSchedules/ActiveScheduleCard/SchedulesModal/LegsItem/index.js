import { format } from 'path';

import { Pill } from '@cogoport/components';
import { differenceInDays } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

// import StepsComponent from '@/ui/page-components/air-schedules/common/Steps';

function LegsItem({ legItem }) {
	const locationsList = legItem?.display_details || [];
	const stepsList = [
		{ title: locationsList.filter((item) => item.id === legItem.origin_port_id)[0]?.display_name || 'Origin' },
		{
			title: locationsList.filter((item) => item.id === legItem.destination_port_id)[0]
				?.display_name || 'Destination',
		},
	];
	return (
		<div>
			<div className={styles.header}>
				{legItem?.transport_type}
				:
				<span className="bold">{legItem?.transport_name}</span>
			</div>
			<div>
				<div className={styles.dates_container}>
					<div className={styles.date_container}>
						{format(legItem?.departure, 'dd MMM yyyy (eee)')}
					</div>
					<div className={styles.date_container}>
						{format(legItem?.arrival, 'dd MMM yyyy (eee)')}
					</div>
				</div>
				<div className={styles.main_pill_container}>
					<Pill size="md" color="#FEF3E9">
						{differenceInDays(new Date(legItem?.arrival), new Date(legItem?.departure))}
						Days
					</Pill>
				</div>
				<div className={styles.steps_container}>
					<StepsComponent stepsList={stepsList} />
				</div>
			</div>
		</div>
	);
}

export default LegsItem;
