import { Modal } from '@cogoport/components';

import MobileVerification from './MobileVerification';

import { useSelector } from '@/packages/store';

function MobileNoVerificationModal({
	showMobileVerificationModal = false,
	setShowMobileVerificationModal = () => {},
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

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
