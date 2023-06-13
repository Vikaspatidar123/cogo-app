import { useEffect, useMemo, useState } from 'react';

import mergeMilestone from '../utils/mergeMilestone';

const useGetCurrentInfo = ({ data = {} }) => {
	const { container_details = [], data: trackingInfo = [] } = data || {};
	const [currContainerDetails, setCurrContainerDetails] = useState('');

	useEffect(() => {
		setCurrContainerDetails(container_details?.[0]);
	}, [container_details]);

	const currentInfo = useMemo(() => {
		const currentTracking = trackingInfo.filter(
			(item) => item?.container_no === currContainerDetails?.container_no,
		)?.[0];

		const { tracking_data = [] } = currentTracking || {};

		const combineList = mergeMilestone(tracking_data);

		return {
			...currentTracking,
			combineMileStoneList: combineList,
		};
	}, [trackingInfo, currContainerDetails]);

	const {
		tracking_data: currTrackingData = [],
		vessel_eta_details = {}, combineMileStoneList = [], currentContainerDetails = {},
	} = currentInfo;

	return {
		currTrackingData,
		vessel_eta_details,
		combineMileStoneList,
		currentContainerDetails,
		currContainerDetails,
		setCurrContainerDetails,
	};
};

export default useGetCurrentInfo;
