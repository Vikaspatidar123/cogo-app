import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import ShareModal from '../components/TrackerCard/Card/Options/ShareModal';

import AddDetails from './components/AddDetails';
import DetentionDetails from './components/Detention_details';
import IncotermDetails from './components/Incoterm_details';
import MilestonesContainer from './components/MileStoneContainer';
import useFetchTrackerDetails from './hooks/useFtechTrackerDetails';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TrackerDetails() {
	const { push } = useRouter();
	const {
		fetchTrackerDetails,
		loading,
		maploading,
		setSelectedContainerId,
		selectedContainerId,
		trackerDetails,
		setTrackerDetails,
		mapPoints,
		setMapPoints,
	} = useFetchTrackerDetails();

	const [selectedContainer, setSelectedContainer] = useState(0);
	const isArchived = trackerDetails?.status === 'completed';
	const { container_details = {}, shipment_info } = trackerDetails || {};
	const containersList = container_details;
	const [isShareModalOpen, setShareModal] = useState(false);
	const handleShareModal = () => {
		setShareModal(!isShareModalOpen);
	};
	return (
		<div>
			<div className={styles.header}>
				<div className={styles.left_container}>
					<IcMArrowBack
						style={{ height: 20, width: 20 }}
						onClick={() => push('/saas/ocean-tracking')}
					/>
					<h1>Shipment Tracker</h1>
				</div>
				{trackerDetails?.input && (
					<div className={styles.right_container}>
						{trackerDetails?.input && (
							<p className={styles.booking_number}>
								{trackerDetails?.type === 'CONTAINER_NO'
									? 'CONTAINER NUMBER:'
									: 'BL/BOOKING NUMBER:'}
								{' '}
								{trackerDetails?.input}
							</p>
						)}
					</div>
				)}
			</div>
			<div>
				<div className={styles.row}>
					<div className={styles.col}>
						{loading && <Placeholder height="150px" width="350px" />}
						{!loading && (
							<IncotermDetails
								trackerDetails={trackerDetails}
								disabled={isArchived}
								fetchTrackerDetails={fetchTrackerDetails}
							/>
						)}
					</div>
					<div className={styles.col}>
						{loading && <Placeholder height="150px" width="350px" />}
						{!loading && (
							<DetentionDetails
								trackerDetails={trackerDetails}
								disabled={isArchived}
								fetchTrackerDetails={fetchTrackerDetails}
								setTrackerDetails={setTrackerDetails}
							/>
						)}
					</div>
					<div className={styles.col}>
						{loading && <Placeholder height="150px" width="350px" />}
						{!loading && (
							<AddDetails
								selectedContainer={selectedContainer}
								setSelectedContainer={setSelectedContainer}
								selectedContainerId={selectedContainerId}
								setSelectedContainerId={setSelectedContainerId}
								containersList={containersList}
								shipmentInfo={shipment_info}
								trackerDetails={trackerDetails}
								setTrackerDetails={setTrackerDetails}
								hackyContainerNumber={trackerDetails?.input}
							/>
						)}
					</div>
				</div>
				<div className={styles.tracking}>
					<MilestonesContainer
						selectedContainerId={selectedContainerId}
						selectedContainer={selectedContainer}
						setSelectedContainerId={setSelectedContainerId}
						mapLoading={maploading}
						trackerDetails={trackerDetails}
						mapPoints={mapPoints}
						setMapPoints={setMapPoints}
						loading={loading}
						handleShareModal={handleShareModal}
					/>
				</div>
			</div>
			{isShareModalOpen && (
				<ShareModal
					show={isShareModalOpen}
					setShow={setShareModal}
					tracker={trackerDetails}
				/>
			)}
		</div>
	);
}
export default TrackerDetails;
