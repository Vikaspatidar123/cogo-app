import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import CargoDetails from './components/CargoDetails';
import CommodityDetails from './components/CommodityDetails';
import PocDetails from './components/Poc_details';
import useFetchTrackerDetails from './hooks/useFtechTrackerDetails';
import MilestonesContainer from './MileStoneContainer';
import ShareAirModal from './MileStoneContainer/ShareAirModal';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TrackerDetails() {
	const { push } = useRouter();
	const {
		fetchTrackerDetails,
		setSelectedContainerId,
		selectedContainerId,
		trackerDetails,
		maploading,
	} = useFetchTrackerDetails();

	const [selectedContainer, setSelectedContainer] = useState(0);
	const isArchived = trackerDetails?.status === 'completed';
	const [isShareModalOpen, setShareModal] = useState(false);
	const isTrackerEmpty = trackerDetails?.tracking_status !== 'Found';

	console.log(isTrackerEmpty, trackerDetails, 'isTrackerEmpty');

	const handleShareModal = () => {
		setShareModal(!isShareModalOpen);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.left_container}>
					<IcMArrowBack
						style={{ height: 20, width: 20 }}
						onClick={() => push('/saas/air-tracking')}
					/>
					<h1>Air Tracker</h1>
				</div>
				<div className={styles.bill}>
					<div className={styles.head}>AIRWAY BILL NO :</div>
					{trackerDetails?.airway_bill_no}
				</div>
			</div>
			<div>
				<div className={styles.row}>
					<PocDetails
						trackerDetails={trackerDetails}
						disabled={isArchived}
						fetchTrackerDetails={fetchTrackerDetails}
					/>
					<CommodityDetails trackerDetails={trackerDetails} fetchTrackerDetails={fetchTrackerDetails} />
					<CargoDetails trackerDetails={trackerDetails} />
					<div className={styles.tracking}>
						<div className={styles.track}>
							<MilestonesContainer
								selectedContainerId={selectedContainerId}
								selectedContainer={selectedContainer}
								setSelectedContainerId={setSelectedContainerId}
								handleShareModal={handleShareModal}
								mapLoading={maploading}
								trackerDetails={trackerDetails}
								disabled={isArchived}
								fetchTrackerDetails={fetchTrackerDetails}
							/>
						</div>
					</div>

					{isShareModalOpen && (
						<ShareAirModal
							isOpen={isShareModalOpen}
							handleModal={handleShareModal}
							saasSubscriptionId={trackerDetails?.id}
						/>
					)}
				</div>
			</div>
		</div>

	);
}
export default TrackerDetails;
