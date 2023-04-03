import { Tooltip } from '@cogoport/components';
import React from 'react';

import RenderTouchPointDetails from './RenderTouchPointDetails';
import styles from './styles.module.css';

function TruckingTouchPoints({ touchPoints = [] }) {
	const forwardJourneyTouchPoints = [];
	const returnJourneyTouchPoints = [];

	touchPoints.forEach((element) => {
		if (element.trip_type === 'one_way') {
			forwardJourneyTouchPoints.push({
				id           : element.id,
				name         : element.name,
				display_name : element.display_name,
			});
		} else {
			returnJourneyTouchPoints.push({
				id           : element.id,
				name         : element.name,
				display_name : element.display_name,
			});
		}
	});

	const isRoundTrip = returnJourneyTouchPoints.length > 0;

	const content = () => (
		<>
			<RenderTouchPointDetails
				touchPoints={forwardJourneyTouchPoints}
				title="Forward"
				isRoundTrip={isRoundTrip}
			/>

			{isRoundTrip ? (
				<RenderTouchPointDetails
					touchPoints={returnJourneyTouchPoints}
					title="Return"
					isRoundTrip={isRoundTrip}
				/>
			) : null}
		</>
	);

	if (touchPoints.length === 0) {
		return null;
	}

	return (
		<div className={styles.touch_point_div}>
			<div>
				Touch Points (
				{touchPoints.length}
				):
			</div>

			<div className={styles.details_div}>
				<Tooltip theme="light" content={content()}>
					<div className={styles.more_btn}> View Details</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default TruckingTouchPoints;
