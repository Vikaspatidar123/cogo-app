import { Modal } from '@cogoport/components';
import { useState } from 'react';

import ShareModal from '../../../TrackerCard/Card/Options/ShareModal';

function ShareAirModal({ setTrackers, refetch, tracker, isOpen, handleModal }) {
	const [showShareModal, setShareModal] = useState(true);
	const handleShare = () => {
		setShareModal(!showShareModal);
	};
	return (

		<Modal onClick={() => handleShare()} onClose={() => handleModal(false)}>
			{/* <div>Hello</div> */}
			{showShareModal && (
				<ShareModal
					tracker={tracker}
					setTrackers={setTrackers}
					refetch={refetch}
					show={showShareModal}
					setShow={setShareModal}
				/>
			)}

		</Modal>
	);
}
export default ShareAirModal;
