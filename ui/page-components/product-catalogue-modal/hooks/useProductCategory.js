/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useProductCategory = ({ labeledValue }) => {
	const [categoryViewData, setCategoryViewData] = useState();
	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};

	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/product/category/list',
		authKey : 'get_saas_product_category_list',
		method  : 'get',
	}, { manual: true });

	const refetchProductCategory = async () => {
		try {
			const resp = await trigger({
				params: {
					organizationId: organization?.id,
				},
			});
			setCategoryViewData(resp?.data);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	useEffect(() => {
		if (labeledValue === 'category') {
			refetchProductCategory();
		}
	}, [labeledValue]);
	return {
		categoryViewData,
		categoryLoading: loading,
		refetchProductCategory,
	};
};
export default useProductCategory;
