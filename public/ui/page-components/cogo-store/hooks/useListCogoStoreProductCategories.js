import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useListCogoStoreProductCategories = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogostore_product_categories',
		method : 'get',
	}, { manual: true });

	const getListCogoStoreProductCategories = useCallback(async () => {
		try {
			await trigger({
				params: {},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [trigger]);

	useEffect(() => {
		getListCogoStoreProductCategories();
	}, [getListCogoStoreProductCategories]);

	return {
		data,
		loading,
	};
};
export default useListCogoStoreProductCategories;
