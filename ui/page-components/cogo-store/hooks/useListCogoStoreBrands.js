import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useListCogoStoreBrands = () => {
	const [{ loading, data }, trigger] = useRequest({
		url: '/list_cogostore_brands',
		method: 'get',
	}, { manual: true });

	const getListBrands = useCallback(async () => {
		try {
			await trigger({
				params: {
					page_limit: 20,
					filters: {
						tags: ['popular'],
						status: 'active',
					},
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [trigger]);

	useEffect(() => {
		getListBrands();
	}, [getListBrands]);

	return {
		data,
		loading,
	};
};
export default useListCogoStoreBrands;
