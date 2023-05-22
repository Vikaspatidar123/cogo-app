/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useGetOceanRoutes from './useGetOceanRoutes';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useFetchTrackerDetails() {
	const MAX_API_TRIES = 10;
	const WAIT_TIME = 10 * 1000;
	const MAX_TIME = 30;
	const wait = (time) => new Promise((res) => {
		setTimeout(() => {
			res();
		}, time);
	});
	const [trackerDetails, setTrackerDetails] = useState(null);
	const [loadingForFirstVisit, setLoadingForFirstVisit] = useState(false);
	const [selectedContainerId, setSelectedContainerId] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState(MAX_TIME);
	const [apiTries, setApiTries] = useState(0);
	const { general } = useSelector((s) => s);
	const { query } = general;
	const id = query?.tracker_id;
	const { getAllOceanRoutes, maploading, setMapPoints, mapPoints } = useGetOceanRoutes();
	const [{ loading }, trigger] = useRequest({
		url    : 'get_saas_container_subscription',
		method : 'get',
	}, { manual: true });

	const fetchTrackerDetails = async (isFirstVisit, callAnyWay = false) => {
		if (apiTries >= MAX_API_TRIES && !callAnyWay) {
			setLoadingForFirstVisit(false);
			return;
		}

		if (isFirstVisit && apiTries === 0) setLoadingForFirstVisit(true);
		let containsData = false;

		try {
			// setLoading(true);

			const res = await trigger({
				params: {
					id,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const trackerData = res.data ?? {};

			setTrackerDetails({
				...trackerData,
				data: trackerData?.data,
			});
			getAllOceanRoutes(trackerData);
			containsData = trackerData?.tracking_status === 'Found';

			setSelectedContainerId(trackerData?.container_number);
		} catch (err) {
			Toast.error("Couldn't fetch tracker's details", err);
		}

		if (isFirstVisit && containsData) {
			setApiTries(MAX_API_TRIES);
		} else if (isFirstVisit && !containsData) {
			await wait(WAIT_TIME);

			setApiTries(apiTries + 1);
		}
	};

	const updateTimer = async () => {
		if (timeRemaining <= 0) return;
		await wait(1000);
		setTimeRemaining(timeRemaining - 1);
	};

	useEffect(() => {
		const isFirstVisit = general?.query?.isFirstVisit != null;
		if (isFirstVisit) updateTimer();
	}, [timeRemaining]);

	useEffect(() => {
		if (id) {
			const isFirstVisit = general?.query?.isFirstVisit != null;
			if (!isFirstVisit) {
				fetchTrackerDetails();
			} else {
				fetchTrackerDetails(isFirstVisit);
			}
		}
	}, [apiTries, id]);
	return {
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
		timeRemaining,
	};
}

export default useFetchTrackerDetails;
