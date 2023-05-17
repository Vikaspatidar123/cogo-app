import { IcMArrowBack } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useFetchQuoteDetails from '../../hooks/useFetchQuoteDetails';

import RenderEmpty from './common/RenderEmpty';
import RenderSkeleton from './common/RenderSkeleton';
import RenderWithTimer from './common/RenderWithTimer';
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
		loadingForFirstVisit,
		timeRemaining,
		loading,
	} = useFetchTrackerDetails();
	const { quoteData, fetchQuoteDetails = () => {} } = useFetchQuoteDetails();
	useEffect(() => {
		fetchQuoteDetails();
	}, []);
	const isArchived = trackerDetails?.status === 'completed';
	const isTrackerEmpty = trackerDetails?.tracking_status !== 'Found';

	const [isShareModalOpen, setShareModal] = useState(false);

	const handleShareModal = () => {
		setShareModal(!isShareModalOpen);
	};
	const renderWithTimer = () => (
		<RenderWithTimer quoteData={quoteData} timeRemaining={timeRemaining} />
	);
	console.log(
		trackerDetails?.data?.[0]?.tracking_data.length,
		'trackerDetails',
		isArchived,
	);
	if (loadingForFirstVisit && timeRemaining > 0) {
		return renderWithTimer();
	}
	// if (!trackerDetails?.data?.[0]?.tracking_data.length > 0 && (!loadingForFirstVisit || !loading)) {
	// 	return <div>{renderWithTimer()}</div>;
	// }
	if (isTrackerEmpty) {
		return <RenderEmpty />;
	}
	if (loadingForFirstVisit || loading) {
		return <RenderSkeleton />;
	}

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
				<div className={styles.flex}>
					<PocDetails
						trackerDetails={trackerDetails}
						disabled={isArchived}
						fetchTrackerDetails={fetchTrackerDetails}
					/>
					<CommodityDetails
						trackerDetails={trackerDetails}
						fetchTrackerDetails={fetchTrackerDetails}
					/>
					<CargoDetails trackerDetails={trackerDetails} />
				</div>
				<div className={styles.row}>
					<div className={styles.tracking}>
						<div className={styles.track}>
							<MilestonesContainer
								selectedContainerId={selectedContainerId}
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
