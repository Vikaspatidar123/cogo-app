import { FluidContainer, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import BottomContainer from './BottomContainer';
import DetailsList from './DetailsList';
import Options from './Options';
import Stepper from './Stepper';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Card({ tracker, setTrackers, refetch }) {
	const { push } = useRouter();

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

	const containersList = tracker?.container_details;
	const commodityDetails = tracker?.commodity_details;
	const locationTracking = tracker?.air_cargo_details;
	const isTrackerEmpty = tracker?.tracking_status !== 'Found';

	const logo_url = tracker?.airline?.logo_url;
	const air_line_name = tracker?.airline?.short_name;

	const containerStatus =	tracker?.milestones?.[activeCarouselIndex]?.container_status?.bool_status
	|| [false, false, false, false];

	const milestoneList = tracker?.milestones;

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

	const handleTrackingDetails = (key) => {
		if (isTrackerEmpty) return;
		push('/saas/air-tracking/[tracker_id]', `/saas/air-tracking/${key}`);
	};

	return (
		<div>

			<FluidContainer className={styles.container}>
				<div className={styles.child_container}>
					<div
						className={styles.stepper}
						role="presentation"
						onClick={() => handleTrackingDetails(tracker.id)}
					>
						<div className={styles.booking_no}>
							{`Airway bill no: ${tracker.input}`}
						</div>
						<Stepper
							logo_url={logo_url}
							containerStatus={containerStatus}
							air_line_name={air_line_name}
							locationTracking={locationTracking}
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
							commodityDetails={commodityDetails}
							containersList={containersList}
							activeCarouselIndex={activeCarouselIndex}
							setActiveCarouselIndex={setActiveCarouselIndex}
							type={tracker.type}
						/>
					</FluidContainer>
				</div>
				<div className={styles.bottom_container}>
					<BottomContainer
						type={SEVERITY_TO_ALERT_TYPE[action?.severity]}
						heading={SEVERITY_TO_HEADING[action?.severity]}
						milestones={milestoneList || {}}
					/>
				</div>
			</FluidContainer>

		</div>
	);
}
export default Card;
