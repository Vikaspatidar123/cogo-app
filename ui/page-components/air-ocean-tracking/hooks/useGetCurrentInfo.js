import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo, useState } from 'react';

import { mergeAirMilestone, mergeOceanMilestone } from '../utils/mergeMilestone';

const useGetCurrentInfo = ({ data = {}, trackingType }) => {
	const [currContainerDetails, setCurrContainerDetails] = useState({});
	const {
		container_details = [], data: trackingInfo = [], airway_bill_details = {},
	} = data || {};

	useEffect(() => {
		if (!isEmpty(container_details) || !isEmpty(airway_bill_details)) {
			setCurrContainerDetails(container_details?.[0] || airway_bill_details);
		}
	}, [container_details, airway_bill_details]);

	const currentInfo = useMemo(() => {
		const currentTracking = trackingInfo.filter(
			(item) => item?.container_no === currContainerDetails?.container_no,
		)?.[0];
		let combineList = [];
		if (trackingType === 'ocean') {
			const { tracking_data = [] } = currentTracking || {};

			combineList = mergeOceanMilestone(tracking_data);
		} else {
			combineList = mergeAirMilestone(trackingInfo);
		}

		return {
			...(currentTracking || {}),
			combineMileStoneList: combineList,
		};
	}, [trackingInfo, trackingType, currContainerDetails]);

	const { tracking_data: currTrackingData = [], combineMileStoneList = [] } = currentInfo;

	return {
		currTrackingData,
		combineMileStoneList,
		currContainerDetails,
		setCurrContainerDetails,
	};
};

export default useGetCurrentInfo;
