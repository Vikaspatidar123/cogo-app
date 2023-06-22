import { Modal } from '@cogoport/components';
import React from 'react';

import MobileNoVerification from './MobileNoVerification';

function MobileNoVerificationModal({
	showMobileNoVerificationModal = false,
	setShowMobileNoVerificationModal = () => {},
}) {
	if (!showMobileNoVerificationModal) return null;

	return (
		<Modal
			show={showMobileNoVerificationModal}
			onClose={() => setShowMobileNoVerificationModal(false)}
			onOuterClick={() => {}}
		>
			<MobileNoVerification />
		</Modal>
	);
}

export default MobileNoVerificationModal;
