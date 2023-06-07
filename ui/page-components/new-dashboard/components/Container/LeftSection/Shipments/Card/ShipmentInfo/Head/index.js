import styles from './styles.module.css';

import ServiceTypeIcon from '@/ui/page-components/new-dashboard/common/ServiceTypeIcon';

function Head({ item }) {
	const { serial_id = '', service_type = '', shipment_type = '' } = item || {};
	return (
		<div className={styles.head}>
			<div className={styles.id}>
				<p className={styles.sub_id}>
					id:
				</p>
				<div className={styles.sub}>
					{serial_id}
				</div>
			</div>
			<div className={styles.sub_lcl}>
				<ServiceTypeIcon freight_type={service_type || shipment_type} />

			</div>
		</div>
	);
}
export default Head;
