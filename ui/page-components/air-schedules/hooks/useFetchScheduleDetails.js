/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { prepareFilters } from '../utils/utils';

import request, { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const MAX_API_TRIES = 10;
const WAIT_TIME = 6 * 1000;
const MAX_TIME = 60;

const wait = (time) => new Promise((res) => {
	setTimeout(() => {
		res();
	}, time);
});

const useFetchScheduleDetails = ({
	pageLimit = 10, id, currentPage,
}) => {
	const [filters, setFilters] = useState({});
	const [sortBy, setSortBy] = useState(null);
	const [scheduleDetails, setScheduleDetails] = useState({});
	const { general, profile } = useSelector((state) => state);
	const [apiTries, setApiTries] = useState(0);
	const [timeRemaining, setTimeRemaining] = useState(MAX_TIME);
	const [loadingForFirstVisit, setLoadingForFirstVisit] = useState(false);
	const [carrierList, setCarrierList] = useState([]);
	const [activeFilter, setActiveFilter] = useState(false);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_saas_air_schedule_subscription',
		method : 'get',
	}, { manual: true });

	const fetchScheduleDetails = async (isFirstVisit) => {
		let containsData;

		if (apiTries >= MAX_API_TRIES) {
			setLoadingForFirstVisit(false);
			return;
		}

		if (isFirstVisit && apiTries === 0) setLoadingForFirstVisit(true);
		if (apiTries === 0) setLoadingForFirstVisit(true);

		try {
			const res = await request({
				params: {
					filters              : { ...prepareFilters(filters, scheduleDetails?.filter_data ?? {}) },
					page                 : currentPage,
					page_limit           : pageLimit,
					performed_by_user_id : profile.id,
					id,
					...(sortBy && { sort_type: 'asc', sort_by: sortBy }),
				},
			});
			const { data } = res;
			containsData = data.schedules.total > 0;
			setScheduleDetails(data);
		} catch (err) {
			Toast.error(err);
		}

		if (isFirstVisit && containsData) {
			setApiTries(MAX_API_TRIES);
		} else if (isFirstVisit && !containsData) {
			// wait until WAIT_TIME before calling the API again
			await wait(WAIT_TIME);
			setApiTries(apiTries + 1);
		}
	};

	const fetchFilterScheduleDetails = async () => {
		try {
			setActiveFilter(true);
			const res = await trigger({
				params: {
					filters,
					page                 : currentPage,
					page_limit           : pageLimit,
					performed_by_user_id : profile.id,
					id,
				},
			});

			const { data } = res;
			const carrierData = data?.schedules?.shipping_lines || [];

			const arrList = carrierData.map((val, index) => ({
				id             : index,
				name           : val.short_name,
				status         : false,
				shippingLineId : val.id,
			}));
			setCarrierList(arrList);
			setScheduleDetails(data);
			setActiveFilter(false);
		} catch (err) {
			Toast.error(err);
		}
	};

	const updateTimer = async () => {
		if (timeRemaining <= 0) return;
		await wait(1000);
		setTimeRemaining(timeRemaining - 1);
	};

	useEffect(() => {
		updateTimer();
	}, [timeRemaining]);

	useEffect(() => {
		const isFirstVisit = general?.query?.isFirstVisit !== null;
		if (!isFirstVisit) {
			fetchScheduleDetails();
		} else {
			fetchScheduleDetails(isFirstVisit);
		}
	}, [apiTries, sortBy]);

	useEffect(() => {
		fetchFilterScheduleDetails();
	}, [filters, currentPage]);

	return {
		activeFilter,
		scheduleDetails,
		carrierList,
		filters,
		sortBy,
		loadingForFirstVisit,
		timeRemaining,
		MAX_TIME,
		setFilters,
		setActiveFilter,
		setSortBy,
		setCarrierList,
		loading,
	};
};

export default useFetchScheduleDetails;
