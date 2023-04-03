import { Toast } from '@cogoport/components';
import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useFetchMasterList = () => {
	const [masterList, setMasterList] = useState([]);
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_list_of_master_alerts',
			method : 'get',
		},
		{ manual: true },
	);
	const fetchList = useCallback(async () => {
		try {
			const res = await trigger({});
			const { data } = res;
			setMasterList(data);
		} catch (err) {
			Toast.error('Unable to fetch list of alerts. Please try again.');
		}
	}, [trigger]);

	useEffect(() => {
		fetchList();
	}, [fetchList]);

	return { loading, masterList, setMasterList };
};
export default useFetchMasterList;
