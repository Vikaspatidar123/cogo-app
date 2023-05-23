import { IcMDelete, IcMPaste, IcMShare } from '@cogoport/icons-react';
import { useState } from 'react';

import DeleteModal from './DeleteModal';
import ShareModal from './ShareModal';
import styles from './styles.module.css';
import UnarchiveModal from './UnarchiveModal';

function Options({
	showPopover, setShowPopover, refetch, tracker, setTrackers, handleDelete, showDeleteModal, setDeleteModal,
}) {
	const [showArchiveModal, setShowArchiveModal] = useState(false);
	const [showShareModal, setShareModal] = useState(false);
	const [unArchiveModal, setUnarchiveModal] = useState(false);
	const isArchived = tracker?.status === 'completed';
	const handleShare = () => {
		setShareModal(!showShareModal);
		setShowPopover(!showPopover);
	};
	const handleArchive = () => {
		setShowArchiveModal(!showArchiveModal);
		setShowPopover(!showPopover);
	};
	const handleUnArchive = () => {
		setUnarchiveModal(!unArchiveModal);
		setShowPopover(!showPopover);
	};
	// const handleDelete = () => {
	// 	setDeleteModal(!showDeleteModal);
	// 	setShowPopover(!showPopover);
	// };

	return (
		<div>
			{
				showPopover && (
					<div>
						<div role="presentation" onClick={() => handleShare()} className={styles.content}>
							<IcMShare />
							Share
						</div>
						<hr />

						{!isArchived && (
							<div>
								<div role="presentation" onClick={() => handleArchive()} className={styles.content}>
									<IcMPaste />
									Archive
								</div>
								<hr />
							</div>
						)}
						{isArchived && (
							<div>
								<div role="presentation" onClick={() => handleUnArchive()} className={styles.content}>
									<IcMPaste />
									UnArchive
								</div>
								<hr />
							</div>
						)}
						<div role="presentation" onClick={() => handleDelete({})} className={styles.content}>
							<IcMDelete />
							Delete
						</div>
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
