import CrossIcon from './crossIcon.svg';
import KycVerified from './kyc-verified.svg';
import PendingIcon from './pending-icon.svg';

import { Container, Label } from './styles';

function KycStatus({ verifications, twin_importer_exporter_id }) {
	const account_type = twin_importer_exporter_id
		? 'importer_exporter'
		: 'service_provider';

	const verification_data = verifications?.filter(
		(verification) => verification.account_type === account_type,
	);

	if (!verification_data) {
		return null;
	}

	const { kyc_status } = verification_data[0] || {};

	return (
		<Container>
			{kyc_status === 'verified' && (
				<>
					<Label className="kyc-verified">Verified</Label>
					<KycVerified width="10px" height="10px" />
				</>
			)}

			{kyc_status === 'rejected' && (
				<>
					<Label>KYC Rejected</Label>
					<CrossIcon width="10px" height="10px" />
				</>
			)}

			{['pending_from_user', 'pending_verification'].includes(kyc_status) && (
				<>
					<Label className="kyc-pending">KYC Pending</Label>
					<PendingIcon width="10px" height="10px" />
				</>
			)}
		</Container>
	);
}

export default KycStatus;
