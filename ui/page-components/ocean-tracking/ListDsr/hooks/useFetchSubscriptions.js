import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFetchSubscriptions = (id) => {
	const [subList, setSubList] = useState([]);
	const [{ loading }, trigger] = useRequest({
		url    : 'get_dsr_to_subscription_mapping',
		method : 'get',
	}, { manual: true });
	const fetchSubscriptions = async () => {
		try {
			const res = await trigger({ params: { id } });
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setSubList(data);
		} catch (err) {
			Toast.error(err);
		}
	};

	useEffect(() => {
		if (id != null) fetchSubscriptions();
	}, []);

	return { loading, subList };
};

export default useFetchSubscriptions;
