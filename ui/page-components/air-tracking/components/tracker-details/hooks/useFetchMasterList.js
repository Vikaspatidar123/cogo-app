import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

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
	const fetchList = async () => {
		try {
			const res = await trigger({});
			const { data } = res;
			setMasterList(data);
		} catch (err) {
			Toast.error('Unable to fetch list of alerts. Please try again.');
		}
	};
	useEffect(() => {
		fetchList();
	}, []);
	return { loading, masterList, setMasterList };
};
export default useFetchMasterList;
