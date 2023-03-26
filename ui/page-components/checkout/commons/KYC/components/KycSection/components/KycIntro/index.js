import { Button } from '@cogoport/components';

// import KycIcon from '../../icons/kyc-icon.svg';

import styles from './styles.module.css';
import useKycIntro from './useKycIntro';

function KycIntro({
	verification = {},
	setKycDetails = () => {},
	kycDetails = {},
}) {
	const { handleStartKYC = () => {}, startKYCVerificationLoading } =		useKycIntro({
		verification,
		setKycDetails,
		kycDetails,
	});

	return (
		<div className={styles.container}>
			{/* <KycIcon style={{ width: 170, height: 145, marginLeft: -6 }} /> */}

			<div className={styles.button_container}>
				<Button
					disabled={startKYCVerificationLoading}
					onClick={handleStartKYC}
					className="primary lg"
				>
					START YOUR KYC
				</Button>
			</div>
		</div>
	);
}

export default KycIntro;
