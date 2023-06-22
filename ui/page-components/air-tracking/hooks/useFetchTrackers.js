/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import {
	FILTER_CARDS_LIST,
	FILTER_KEYS,
	FILTER_KEY_TO_ID,
	FILTER_KEY_TO_LABEL,
} from '../common/constants';
import { prepareFilters } from '../common/utils';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchTrackers = ({ isTrackersEmptyCallback = () => {}, pageLimit = 10, archived }) => {
	const [airTrackers, setAirTrackers] = useState(null);
	const [status, setStatus] = useState(['active']);
	const [filters, setFilters] = useState({});
	const [pagination, setPagination] = useState({ page: 1 });
	const { stats = {} } = airTrackers || {};
	const [activeKey, setActiveKey] = useState(FILTER_KEYS.ALL_CARGO);
	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : '/list_saas_air_subscriptions',
		method : 'get',
	}, { manual: true });
	const fetchTrackers = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_branch_id: general?.query?.branch_id,
						...prepareFilters(filters, airTrackers?.filter_data ?? {}),
						status,

					},
					page       : pagination.page,
					page_limit : pageLimit,
				},
			});

			const { data } = res || {};

			setAirTrackers((prevData) => ({ ...prevData, ...data }));
			if (!data?.list?.length && isEmpty(filters)) {
				isTrackersEmptyCallback();
			}
		} catch (err) {
			console.log(err);
			// Toast.error('Cannot fetch store quota. Please try again later.');
		}
	}, [status, filters, pagination, airTrackers]);
	const removeActiveKeyFromFilters = () => {
		const newFilters = { ...filters };
		delete newFilters[activeKey];

		return newFilters;
	};
	const onClick = (key) => {
		if (key === activeKey) return;

		const newFilters = removeActiveKeyFromFilters();
		if (key === FILTER_KEYS.ALL_CARGO) {
			setStatus(['active', 'completed']);
			setFilters(newFilters);
		} else {
			newFilters[key] = stats[FILTER_KEY_TO_ID[key]];
			setFilters(newFilters);
			setStatus(['active']);
		}
	};
	useEffect(() => {
		let newActiveKey = FILTER_KEYS.ALL_CARGO;
		FILTER_CARDS_LIST.forEach((key) => {
			if (key in filters) {
				newActiveKey = key;
			}
		});
		setActiveKey(newActiveKey);
	}, [JSON.stringify(filters)]);
	const selectedCardLabel = FILTER_KEY_TO_LABEL[FILTER_CARDS_LIST.filter((key) => key === activeKey)[0]] ?? '';
	useEffect(() => {
		fetchTrackers();
	}, [filters, pagination, status, archived]);

	const refetch = () => fetchTrackers(false);

	return {
		loading,
		trackers    : airTrackers,
		setTrackers : setAirTrackers,
		fetchTrackers,
		filters,
		pagination,
		setFilters,
		setPagination,
		refetch,
		activeKey,
		onClick,
		selectedCardLabel,
		FILTER_CARDS_LIST,
		setStatus,
	};
};

export default useFetchTrackers;
