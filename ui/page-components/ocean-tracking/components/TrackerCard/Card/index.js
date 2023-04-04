import { FluidContainer, Popover } from '@cogoport/components';
import { IcMDelete, IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import BottomContainer from './BottomContainer';
import DetailsList from './DetailsList';
import Options from './Options';
import DeleteModal from './Options/DeleteModal';
import Stepper from './Stepper';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Card({ tracker, setTrackers, refetch }) {
	const SEVERITY_TO_ALERT_TYPE = {
		LOW  : 'success',
		HIGH : 'error',
	};

	const SEVERITY_TO_HEADING = {
		LOW  : 'On Track',
		HIGH : 'Attention Needed',
	};

	const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

	const { action } = tracker || {};

	const shipment_info = tracker?.shipment_info ?? {};
	const containersList = tracker?.container_details;
	const isTrackerEmpty = tracker?.tracking_status !== 'Found';
	const logo_url = tracker?.shipping_line?.logo_url;
	const shipping_line_name = tracker?.shipping_line?.short_name;

	const containerStatus =	tracker?.milestones[activeCarouselIndex]?.container_status?.bool_status
	|| [false, false, false, false];

	const milestoneList = tracker?.milestones
		? tracker?.milestones[activeCarouselIndex]
		: {};

	const actionList = action ? action[activeCarouselIndex] : {};

	const [showPopover, setShowPopover] = useState(false);
	const onRender = () => (
		<Options
			tracker={tracker}
			setTrackers={setTrackers}
			refetch={refetch}
			showPopover={showPopover}
			setShowPopover={setShowPopover}
		/>
	);
	const { push } = useRouter();
	const handleTrackingDetails = (key) => {
		if (isTrackerEmpty) return;
		push('/saas/tracking/[tracker_id]', `/saas/tracking/${key}`);
	};
	const [showDeleteModal, setDeleteModal] = useState(false);
	return (
		<div>
			<FluidContainer className={styles.container}>
				{!isTrackerEmpty && (
					<>
						<div className={styles.child_container}>
							<div
								role="presentation"
								className={styles.stepper}
								onClick={() => handleTrackingDetails(tracker.id)}
							>
								<div className={styles.booking_no}>
									{tracker.type === 'CONTAINER_NO' ? 'Container No:' : 'BL/Booking no:'}
									{' '}
									{tracker.input}

								</div>
								<Stepper
									logo_url={logo_url}
									containerStatus={containerStatus}
									shipping_line_name={shipping_line_name}
								/>
							</div>
							<div className={styles.dashed_line} />
							<FluidContainer className={styles.details_list}>
								<div className={styles.icon_style}>
									<Popover
										placement="bottom"
										visible={showPopover}
										render={onRender()}
										onClickOutside={() => setShowPopover(false)}
									>
										<IcMOverflowDot onClick={() => setShowPopover(true)} />
									</Popover>
								</div>
								<DetailsList
									containersList={containersList}
									shipmentInfo={shipment_info}
									activeCarouselIndex={activeCarouselIndex}
									setActiveCarouselIndex={setActiveCarouselIndex}
									type={tracker.type}
								/>
							</FluidContainer>
						</div>
						<div className={styles.bottom_container}>
							<BottomContainer
								type={SEVERITY_TO_ALERT_TYPE[actionList?.severity]}
								heading={SEVERITY_TO_HEADING[actionList?.severity]}
								milestones={milestoneList?.current_status || {}}
								lastUpdated={tracker?.updated_at || ''}
							/>
						</div>
					</>
				)}
				{isTrackerEmpty && (
					<div className={styles.empty}>
						<div className={styles.empty_header}>
							<div className={styles.booking_no}>
								{tracker.type === 'CONTAINER_NO' ? 'Container No:' : 'BL/Booking no:'}
								{' '}
								{tracker.input}
							</div>
							<div className={styles.icon}>
								<IcMDelete onClick={() => setDeleteModal(!showDeleteModal)} width={20} height={20} />
							</div>

						</div>

						<div className={styles.empty_container}>

							<div>
								<h4>
									Retrieving Tracking Data
								</h4>
							</div>
							<div className={styles.text}>
								<div>
									Fetching data on this container / shipment is taking longer than usual. We
									will inform you as soon as its available.
								</div>
							</div>
						</div>
					</div>
				)}
			</FluidContainer>
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
		</div>
	);
}
export default Card;
