// import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
// import formatDate from '@cogo/globalization/utils/formatDate';
// import React from 'react';

// import { Container, List, Label, Value, Item, Tasks, Dot } from './styles';
// import format from 'date-fns/format';
import { format } from 'util';

import styles from './styles.module.css';

function MoreDetails({ data }) {
	const handleDate = (item) => format({
		date       : item,
		dateFormat : 'dd MMM yyyy',
		formatType : 'date',
	});
	const list = [
		{
			label: 'ETD',
			value:
				data?.selected_schedule_departure
				|| data?.schedule_departure
				|| data?.state !== 'completed'
					? handleDate(
						data?.selected_schedule_departure || data?.schedule_departure,
					  )
					: null,
		},
		{
			label: 'ETA',
			value:
				data?.selected_schedule_arrival
				|| data?.schedule_departure
				|| data?.state !== 'completed'
					? handleDate(
						data?.selected_schedule_arrival || data?.schedule_departure,
					  )
					: null,
		},
		{
			label : 'Shipping Line',
			value : (data?.shipping_line || {}).short_name,
		},
		{
			label : 'Air Line',
			value : (data?.airline || {}).short_name,
		},
		{
			label : 'Updated At',
			value : handleDate(data?.last_updated_at),
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{list?.map((item) => (item?.value ? (
					<div className={styles.item} key={item?.label}>
						<span className={styles.label}>{`${item?.label}:`}</span>
						<span className={styles.value}>{item?.value}</span>
					</div>
				) : null))}
			</div>
			{data.pending_tasks_count ? (
				<div className={styles.tasks}>
					<span className={styles.dot} />
					{`${data?.pending_tasks_count} Pending Tasks`}
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default MoreDetails;
