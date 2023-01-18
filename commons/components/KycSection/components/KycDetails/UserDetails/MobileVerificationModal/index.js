import { useSelector } from '@cogoport/front/store';
import { Modal } from '@cogoport/front/components/admin';
import MobileVerification from './MobileVerification';

function MobileNoVerificationModal({
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
			<MobileVerification type={showMobileVerificationModal} />
		</Modal>
	);
}

export default MobileNoVerificationModal;
