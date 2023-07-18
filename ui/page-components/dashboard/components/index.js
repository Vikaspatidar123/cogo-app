import { getCookie } from '@cogoport/utils';

import useGetTracking from '../hooks/useGetTracking';

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

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PAYLATER_SUPPORTED_COUNTRIES = GLOBAL_CONSTANTS.feature_supported_service.paylater.supported_countries;
const KYC_PENDING_STATUS = 'pending_verification';

function SassDashboard() {
	const location = getCookie('location');

	const { airTracking, oceanTracking, kyc_status } = useGetTracking();

	return (
		<div className={styles.main_class}>
			<div className={styles.main_class2}>
				<div className={styles.part1}>
					{/* <VerifyEmailMobile /> */}

					{kyc_status !== KYC_PENDING_STATUS && (
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
						{PAYLATER_SUPPORTED_COUNTRIES.includes(location) && <PayLaterWidgets />}
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
