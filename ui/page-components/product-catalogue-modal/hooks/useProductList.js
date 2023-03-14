/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useSearchQuery from './useSearchQuery';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useProductList = ({ labeledValue }) => {
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const { id: orgId, country } = organization || {};
	const [productList, setProductList] = useState({});

	const [pagination, setPagination] = useState(1);
	const [globalFilter, setGlobalFilter] = useState();

	const { debounceQuery, query } = useSearchQuery();

	const [{ loading }, productTrigger] = useRequestBf({
		url     : '/saas/product/list',
		authkey : 'get_saas_product_list',
		method  : 'get',
	}, { manual: true });

	const refetchProduct = async ({ page = 1, productClassificationId = null }) => {
		try {
			const response = await productTrigger({
				params: {
					page,
					query,
					pageLimit       : labeledValue === 'list' ? 5 : 1000,
					productClassificationId,
					organizationId  : orgId,
					originCountry   : country?.name,
					originCountryId : country?.country_id,
				},
			});
			setProductList(response.data);
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	useEffect(() => {
		if (pagination > 0 && labeledValue === 'list') {
			refetchProduct({ page: pagination });
		}
	}, [pagination, labeledValue]);

	useEffect(() => {
		if (globalFilter !== undefined && globalFilter !== null) {
			debounceQuery(globalFilter);
		}
	}, [globalFilter]);

	useEffect(() => {
		if (query !== undefined && query !== null) {
			refetchProduct({ page: 1 });
			setPagination(1);
		}
	}, [query]);

	return {
		productList,
		globalFilter,
		setGlobalFilter,
		pagination,
		setPagination,
		loading,
		refetchProduct,
	};
};

export default useProductList;
