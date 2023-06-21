import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useListBanner = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogostore_banners',
		method : 'get',
	}, { manual: true });

	const getBanner = useCallback(() => {
		try {
			trigger({});
		} catch (err) {
			console.log('err', err);
		}
	}, [trigger]);

	useEffect(() => {
		getBanner();
	}, [getBanner]);

	return { getBanner, loading, data };
};
export default useListBanner;
