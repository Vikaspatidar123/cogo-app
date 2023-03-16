/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { prepareFilters } from '../utils/utils';

import request, { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchScheduleDetails = ({
	pageLimit = 10, id, currentPage,
}) => {
	const [filters, setFilters] = useState({});
	const [sortBy, setSortBy] = useState(null);
	const [scheduleDetails, setScheduleDetails] = useState({});
	const { general, profile } = useSelector((state) => state);
	const [carrierList, setCarrierList] = useState([]);
	const [activeFilter, setActiveFilter] = useState(false);

	const [{ loading: filterFetchLoading }, trigger] = useRequest({
		url    : '/get_sailing_schedule_subscription',
		method : 'get',
	}, { manual: true });

	const fetchScheduleDetails = async () => {
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
			setScheduleDetails(data);
		} catch (err) {
			Toast.error(err);
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

	useEffect(() => {
		const isFirstVisit = general?.query?.isFirstVisit !== null;
		if (!isFirstVisit) {
			fetchScheduleDetails();
		} else {
			fetchScheduleDetails(isFirstVisit);
		}
	}, [sortBy]);

	useEffect(() => {
		fetchFilterScheduleDetails();
	}, [filters, currentPage]);

	return {
		filterFetchLoading,
		activeFilter,
		scheduleDetails,
		carrierList,
		filters,
		sortBy,
		setFilters,
		setActiveFilter,
		setSortBy,
		setCarrierList,
	};
};

export default useFetchScheduleDetails;
