import { useSelector } from '@cogo/store';
import { Modal } from '@cogoport/front/components/admin';

import MobileVerification from './MobileVerification';

function MobileNoVerificationModal({
	channelPartnerDetails = {},
	selectedUser = {},
	showMobileVerificationModal = false,
	setShowMobileVerificationModal = () => {},
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	return (
		<Modal
			className="primary sm"
			show={showMobileVerificationModal}
			onClose={() => setShowMobileVerificationModal(false)}
			onOuterClick={() => setShowMobileVerificationModal(false)}
			width={isMobile ? 'auto' : 400}
			position={isMobile ? 'bottom' : ''}
		>
			<MobileVerification
				channelPartnerDetails={channelPartnerDetails}
				selectedUser={selectedUser}
				type={showMobileVerificationModal}
			/>
		</Modal>
	);
}

export default MobileNoVerificationModal;
