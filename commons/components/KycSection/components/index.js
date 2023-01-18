import KycIntro from './KycIntro';
import KycDetails from './KycDetails';
import KycCompleted from './KycCompleted';
import LoadingState from './LoadingState';
import useKycSection from './useKycSection';

function KycSection() {
	const {
		kycDetails = {},
		setKycDetails = () => {},
		loading = false,
	} = useKycSection();

	if (loading || !Object.keys(kycDetails).length) {
		return <LoadingState />;
	}

	const { kyc_started_at, kyc_status } = kycDetails;

	if (!kyc_started_at) {
		return <KycIntro kycDetails={kycDetails} setKycDetails={setKycDetails} />;
	}

	if (['pending_from_user', 'rejected'].includes(kyc_status)) {
		return <KycDetails kycDetails={kycDetails} setKycDetails={setKycDetails} />;
	}

	if (kyc_status === 'pending_verification') {
		return <KycCompleted />;
	}

	return null;
}

export default KycSection;
