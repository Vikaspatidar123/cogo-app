import { Modal } from '@cogoport/components';

import MobileVerification from './MobileVerification';

import { useSelector } from '@/packages/store';

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
