import AccountDetails from './AccountDetails';
import ProfileProgress from './ProfileProgress';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function ProfileDetails() {
	const {
		profile: { organization = {} },
		general: { isMobile, query },
	} = useSelector((state) => state);
	const { kyc_status } = organization || {};

	return (
		<>
			<ProfileProgress />

			{/* {kyc_status.includes('pending') && <KycWidget kyc_status={kyc_status} />} */}

			<div className={styles.container}>
				<AccountDetails />
			</div>
		</>
	);
}
export default ProfileDetails;
