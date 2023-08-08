import { Modal } from '@cogoport/components';

import MobileVerification from './MobileVerification';

function MobileNoVerificationModal({
	showMobileVerificationModal = false,
	setShowMobileVerificationModal = () => {},
}) {
	return (
		<Modal
			show={showMobileVerificationModal}
			onClose={() => setShowMobileVerificationModal(false)}
			onOuterClick={() => setShowMobileVerificationModal(false)}
			scroll={false}
			size="sm"
		>
			<MobileVerification type={showMobileVerificationModal} />
		</Modal>
	);
}

export default MobileNoVerificationModal;
