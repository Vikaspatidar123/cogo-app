import { Toast } from '@cogoport/components';
import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useHsCode = () => {
	const [commodity, setCommodity] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : 'list_hs_codes',
		method : 'get',
	}, { manual: true });

	const getCommodity = useCallback(async () => {
		try {
			const res = await trigger({
				params: { page_limit: 2000 },
			});
			setCommodity(res?.data?.list);
		} catch (err) {
			Toast.error(err?.message || 'No commodity found');
		}
	}, [trigger]);
	useEffect(() => {
		getCommodity();
	}, [getCommodity]);
	return {
		loading,
		commodity,
	};
};

export default useHsCode;
