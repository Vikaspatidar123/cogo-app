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

// import VerifyEmailMobile from '@/ui/commons/components/VerifyEmailMobile';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryId from '@/ui/commons/utils/getCountryId';

const INDIA_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.IN);
function SassDashboard() {
	const { airTracking, oceanTracking, query, country_id, kyc_status } = GetTracking();

	return (
		<div className={styles.main_class}>
			<div className={styles.main_class2}>
				<div className={styles.part1}>
					{/* <VerifyEmailMobile /> */}

					{kyc_status !== 'pending_verification' && (
						<div className={styles.top}>
							<KYCPage />
						</div>
					)}
					<Shipments />
					<div>
						<div className={styles.child1}>
							<DiscoverRates />
						</div>
					</div>
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
				<div className={styles.part2}>
					<div className={styles.child2}>
						{country_id === INDIA_COUNTRY_ID
							&& query?.account_type === 'importer-exporter' && <PayLaterWidgets />}
						<Elgibility />
						<ExportFactoring />
						<Promotion />
					</div>
				</div>
			</div>

		</div>

	);
}
export default SassDashboard;
