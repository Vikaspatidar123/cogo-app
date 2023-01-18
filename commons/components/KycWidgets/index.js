import CompleteKyc from './CompleteKyc';
import KycSubmitted from './KycSubmitted';
import LoadingState from './loading-state';
import StartKyc from './StartKyc';
import useKycWidgets from './useKycWidgets';

function KycWidgets() {
	const { loading = false, data = {} } = useKycWidgets();

	if (loading) {
		return <LoadingState />;
	}

	return (
		<>
			{!data.kyc_started_at && <StartKyc />}

			{data.kyc_started_at && data.kyc_status === 'pending_from_user' && (
				<CompleteKyc />
			)}

			{data.kyc_started_at && data.kyc_status === 'pending_verification' && (
				<KycSubmitted />
			)}
		</>
	);
}

export default KycWidgets;
