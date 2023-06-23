import { useState } from 'react';

import GetTracking from '../hooks/GetTracking';

import DiscoverRates from './DiscoverRates';
import Elgibility from './Elgibility';
import ExportFactoring from './ExportFactoring';
import KYCPage from './KYCPage';
import PayLaterWidgets from './PayLaterWidgets';
import Promotion from './Promotion';
import Schedule from './Schedule';
import SetPassword from './SetPassword';
import Shipments from './Shipments';
import styles from './styles.module.css';
import Tracking from './Tracking';
import ActiveTracking from './Tracking/ActiveTracking';

// import VerifyEmailMobile from '@/ui/commons/components/VerifyEmailMobile';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function SassDashboard() {
	const { airTracking, oceanTracking, query, country_id, kyc_status } = GetTracking();
	const { mail_verify = false } = query;

	const [showPasswordModal, setShowPasswordModal] = useState(mail_verify);

	return (
		<div className={`${styles.main_class} ${showPasswordModal ? styles.main_class_blur : ''}`}>
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
						{country_id === GLOBAL_CONSTANTS.country_ids.IN
							&& query?.account_type === 'importer-exporter' && <PayLaterWidgets />}
						<Elgibility />
						<ExportFactoring />
						<Promotion />
					</div>
				</div>
			</div>
			<SetPassword showModal={showPasswordModal} setShowModal={setShowPasswordModal} />
		</div>

	);
}
export default SassDashboard;
