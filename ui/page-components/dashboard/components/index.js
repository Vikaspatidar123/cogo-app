import { getCookie } from '@cogoport/utils';
import { useState } from 'react';

import useGetTracking from '../hooks/useGetTracking';

import DiscoverRates from './DiscoverRates';
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

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PAYLATER_SUPPORTED_COUNTRIES = GLOBAL_CONSTANTS.feature_supported_service.paylater.supported_countries;
const KYC_PENDING_STATUS = 'pending_verification';

function SassDashboard() {
	const { general: { query: { mode = '' } } } = useSelector((state) => state);

	const location = getCookie('location');

	const { airTracking, oceanTracking, kyc_status } = useGetTracking();

	const isSetPassword = mode === 'set_password';

	const [showPasswordModal, setShowPasswordModal] = useState(isSetPassword);

	return (
		<div className={`${styles.main_class} ${showPasswordModal ? styles.main_class_blur : ''}`}>
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
