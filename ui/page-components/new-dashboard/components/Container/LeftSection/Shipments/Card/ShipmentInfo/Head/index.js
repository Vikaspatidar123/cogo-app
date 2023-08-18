import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import ServiceTypeIcon from '@/ui/page-components/new-dashboard/common/ServiceTypeIcon';

function Head({ item }) {
	const { serial_id = '', service_type = '', shipment_type = '' } = item || {};
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.head}>
			<div className={styles.id}>
				<p className={styles.sub_id}>
					{t('dashboard:common_serialId_label')}
					:
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
