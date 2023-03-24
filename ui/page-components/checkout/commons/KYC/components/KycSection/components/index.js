import KycCompleted from './KycCompleted';
import KycDetails from './KycDetails';
import KycIntro from './KycIntro';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import useKycSection from './useKycSection';
import KycVerified from './Verified';

const KYC_STATUS_COMPONENT_MAPPING = {
	pending_from_user    : KycDetails,
	pending_verification : KycCompleted,
	verified             : KycVerified,
	rejected             : KycDetails,
};

function KycSection({ source, channelPartnerDetails = {} }) {
	const {
		kycDetails = {},
		setKycDetails = () => {},
		loading = false,
	} = useKycSection({ channelPartnerDetails });

	if (loading || !Object.keys(kycDetails).length === 0) {
		return <LoadingState />;
	}

	const renderKycIntroComponent = () => {
		if (kycDetails.kyc_started_at) {
			return null;
		}

		return (
			<KycIntro
				verification={channelPartnerDetails.verification?.[0]}
				kycDetails={kycDetails}
				setKycDetails={setKycDetails}
			/>
		);
	};

	const renderKycStatusComponent = () => {
		const { kyc_started_at, kyc_status } = kycDetails;

		if (!kyc_started_at) {
			return null;
		}

		const kycStatusComponentProps = {
			pending_from_user: {
				source,
				channelPartnerDetails,
				kycDetails,
				setKycDetails,
			},
			pending_verification : {},
			verified             : {
				channelPartnerDetails,
			},
			rejected: {
				channelPartnerDetails,
				kycDetails,
				setKycDetails,
			},
		};

		const Component = KYC_STATUS_COMPONENT_MAPPING[kyc_status] || null;

		if (!Component) {
			return null;
		}

		const componentProps = kycStatusComponentProps[kyc_status] || {};

		return <Component key={kyc_status} {...componentProps} />;
	};

	return (
		<div className={styles.container}>
			{renderKycIntroComponent()}

			{renderKycStatusComponent()}
		</div>
	);
}

export default KycSection;
