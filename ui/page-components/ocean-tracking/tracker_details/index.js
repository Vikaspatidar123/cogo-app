import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import useFetchTrackers from '../hooks/useFetchTrackers';

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
		loadingForFirstVisit,
		trackerDetails,
		setTrackerDetails,
		mapPoints,
		setMapPoints,
	} = useFetchTrackerDetails();

	// const {
	// 	 trackers, setTrackers,
	// } = useFetchTrackers();
	// const containersList = tracker?.container_details;
	// const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
	const [selectedContainer, setSelectedContainer] = useState(0);
	const isArchived = trackerDetails?.status === 'completed';
	const { container_details = {}, shipment_info } = trackerDetails || {};
	const containersList = container_details;
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
						{/* <IconMenu size={1.5} onClick={handleMobileMenu} /> */}
					</div>
				)}
			</div>
			<div>
				<div className={styles.row}>
					<div className={styles.col}>
						<IncotermDetails
							trackerDetails={trackerDetails}
							disabled={isArchived}
							fetchTrackerDetails={fetchTrackerDetails}
						/>
					</div>
					<div className={styles.col}>
						<DetentionDetails
							trackerDetails={trackerDetails}
							disabled={isArchived}
							fetchTrackerDetails={fetchTrackerDetails}
							setTrackerDetails={setTrackerDetails}
						/>
					</div>
					<div className={styles.col}>
						<AddDetails
							selectedContainer={selectedContainer}
							setSelectedContainer={setSelectedContainer}
							selectedContainerId={selectedContainerId}
							setSelectedContainerId={setSelectedContainerId}
							containersList={containersList}
							shipmentInfo={shipment_info}
							trackerDetails={trackerDetails}
							setTrackerDetails={setTrackerDetails}
						// container_number should come inside containersList
							hackyContainerNumber={trackerDetails?.input}
						/>
					</div>
				</div>
				<div className={styles.tracking}>
					<MilestonesContainer
						selectedContainerId={selectedContainerId}
						selectedContainer={selectedContainer}
						setSelectedContainerId={setSelectedContainerId}
						// handleShareModal={handleShareModal}
						mapLoading={maploading}
						trackerDetails={trackerDetails}
						mapPoints={mapPoints}
						setMapPoints={setMapPoints}
					/>
				</div>
			</div>
		</div>
	);
}
export default TrackerDetails;
