import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function MoreDetails({ data, currentTab = '' }) {
	const handleDate = (item) => format(item, 'dd MMM yyyy');
	const list = [
		{
			label : 'Shipper/Consignee',
			value : currentTab === 'shipper_consignee'
				? (data?.importer_exporter?.business_name) : (data?.shipper_consignee?.business_name),
		},
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
