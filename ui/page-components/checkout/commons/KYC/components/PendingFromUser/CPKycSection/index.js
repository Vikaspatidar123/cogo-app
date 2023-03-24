import KycDetails from '../../KycSection/components/KycDetails';
import useKycSection from '../../KycSection/components/useKycSection';

function CPKycSection({ source, setShow, onClose, channelPartnerDetails }) {
	const { kycDetails, setKycDetails } = useKycSection({
		channelPartnerDetails,
	});

	return (
		<KycDetails
			source={source}
			setShow={setShow}
			onClose={onClose}
			kycDetails={kycDetails}
			setKycDetails={setKycDetails}
			channelPartnerDetails={channelPartnerDetails}
		/>
	);
}

export default CPKycSection;
