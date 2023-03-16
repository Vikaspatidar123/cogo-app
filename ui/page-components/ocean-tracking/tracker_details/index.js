import { IcMArrowBack } from '@cogoport/icons-react';

import DetentionDetails from './components/Detention_details';
import IncotermDetails from './components/Incoterm_details';
import useFetchTrackerDetails from './hooks/useFtechTrackerDetails';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TrackerDetails() {
	const { push } = useRouter();
	const {
		fetchTrackerDetails,
		loading,
		setSelectedContainerId,
		selectedContainerId,
		loadingForFirstVisit,
		trackerDetails,
		setTrackerDetails,
	} = useFetchTrackerDetails();
	const isArchived = trackerDetails?.status === 'completed';
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
					{/* <div className={styles.col}>
						<IncotermDetails
							disabled={isArchived}
							fetchTrackerDetails={fetchTrackerDetails}
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
}
export default TrackerDetails;
