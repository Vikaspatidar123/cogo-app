import { useState } from 'react';

import DeleteModal from './DeleteModal';
import ShareModal from './ShareModal';
import UnarchiveModal from './UnarchiveModal';

function Options({ showPopover, setShowPopover, refetch, tracker, setTrackers }) {
	const [showDeleteModal, setDeleteModal] = useState(false);
	const [showArchiveModal, setShowArchiveModal] = useState(false);
	const [showShareModal, setShareModal] = useState(false);
	const [unArchiveModal, setUnarchiveModal] = useState(false);
	// const type = 'delete';
	const isArchived = tracker?.status === 'completed';
	// const handleShare = () => {
	// 	setShareModal(!showShareModal);
	// };
	console.log(showArchiveModal, 'showArchiveModal');
	return (
		<div>
			{
            showPopover && (
	           <div>
		            <div role="presentation" onClick={() => setShareModal(!showShareModal)}>Share</div>
		            {!isArchived && (
			            <div role="presentation" onClick={() => setShowArchiveModal(!showArchiveModal)}>Archive</div>
		            )}
		            {isArchived && (
			            <div role="presentation" onClick={() => setUnarchiveModal(!unArchiveModal)}>UnArchive</div>
		            )}
		            <div role="presentation" onClick={() => setDeleteModal(true)}>Delete</div>
	           </div>
            )
          }
			{showShareModal && (
				<ShareModal
					tracker={tracker}
					setTrackers={setTrackers}
					refetch={refetch}
					show={showShareModal}
					setShow={setShareModal}
				/>
		    )}
			{showDeleteModal && (
				<DeleteModal
					tracker={tracker}
					setTrackers={setTrackers}
					refetch={refetch}
					show={showDeleteModal}
					setShow={setDeleteModal}
					type="delete"
				/>
			)}
			{showArchiveModal && (
				<DeleteModal
					tracker={tracker}
					setTrackers={setTrackers}
					refetch={refetch}
					show={showArchiveModal}
					setShow={setShowArchiveModal}
					type="archive"
				/>
			)}
			{unArchiveModal && (
				<UnarchiveModal
					tracker={tracker}
					setTrackers={setTrackers}
					refetch={refetch}
					show={unArchiveModal}
					setShow={setUnarchiveModal}
				/>
			)}
		</div>

	);
}
export default Options;
