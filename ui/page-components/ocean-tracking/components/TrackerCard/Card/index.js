import { FluidContainer } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import BottomContainer from './BottomContainer';
import DetailsList from './DetailsList';
import Stepper from './Stepper';
import styles from './styles.module.css';

function Card({ tracker }) {
	console.log(tracker, 'tracker');

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

	const logo_url = tracker?.shipping_line?.logo_url;
	const shipping_line_name = tracker?.shipping_line?.short_name;

	const containerStatus =	tracker?.milestones[activeCarouselIndex]?.container_status?.bool_status
	|| [false, false, false, false];

	const milestoneList = tracker?.milestones
		? tracker?.milestones[activeCarouselIndex]
		: {};

	const actionList = action ? action[activeCarouselIndex] : {};

	console.log(containerStatus, 'containerStatus');

	return (
		<FluidContainer className={styles.container}>
			{/* <div className={styles.head}>
				<div className={styles.booking_no}>
					{tracker.type === 'CONTAINER_NO' ? 'Container No:' : 'BL/Booking no:'}
					{' '}
					{tracker.input}

				</div>
				<div className={styles.icon_style}>
					<IcMOverflowDot />
				</div>
			</div> */}
			<div className={styles.child_container}>
				<div className={styles.stepper}>
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
						<IcMOverflowDot />
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
		</FluidContainer>
	);
}
export default Card;
