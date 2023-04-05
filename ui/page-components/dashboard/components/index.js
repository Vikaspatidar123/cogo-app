import GetTracking from '../hooks/GetTracking';

import DiscoverRates from './DiscoverRates';
import Elgibility from './Elgibility';
import ExportFactoring from './ExportFactoring';
import KYCPage from './KYCPage';
import PayLaterWidgets from './PayLaterWidgets';
import Promotion from './Promotion';
import Schedule from './Schedule';
import Shipments from './Shipments';
import styles from './styles.module.css';
import Tracking from './Tracking';
import ActiveTracking from './Tracking/ActiveTracking';

import { useSelector } from '@/packages/store';

const INDIA_COUNTRY_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';

function SassDashboard() {
	const { air_track } = GetTracking();
	const airTracking = air_track?.dashboard_products?.air_tracking || {};
	const oceanTracking = air_track?.dashboard_products?.container_tracking	|| {};

	const { query, country_id } = useSelector(({ general, profile }) => ({
		query      : general?.query,
		country_id : profile?.organization?.country_id,
	}));
	return (
		<div className={styles.main_class}>
			<div className={styles.left_container}>
				<KYCPage />
				<Shipments />
				<DiscoverRates />
				<Schedule />
				{
						(Object.keys(airTracking?.data || {}).length > 0
						|| Object.keys(oceanTracking?.data || {}).length > 0 ? (

							<ActiveTracking
								airTracking={airTracking}
								oceanTracking={oceanTracking}
							/>
							) : (
								<Tracking />
							))
					}
			</div>
			<div className={styles.right_container}>
				<div className={styles.child2}>
					{country_id === INDIA_COUNTRY_ID
						&& query?.account_type === 'importer-exporter' && <PayLaterWidgets />}
					<Elgibility />
					<ExportFactoring />
					<Promotion />
				</div>
			</div>
		</div>
	);
}
export default SassDashboard;
