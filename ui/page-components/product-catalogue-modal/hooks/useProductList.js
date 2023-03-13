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

	// const addApi = useRequest('post', false, scope, {
	// 	authkey: 'post_saas_product',
	// })('/saas/product/');
	// const deleteProductApi = useRequest('delete', false, scope, {
	// 	authkey: 'delete_saas_product',
	// })('/saas/product');

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

	// const addProduct = async (data, countryName, setShowProduct, pdId) => {
	// 	const { prefiledValues, pricingDetails } = data || {};
	// 	try {
	// 		const resp = await addApi.trigger({
	// 			data: {
	// 				userId: id,
	// 				organizationId: organization.id,
	// 				...prefiledValues,
	// 				...pricingDetails,
	// 				originCountry: countryName,
	// 				currency: organization?.country?.currency_code,
	// 				productClassificationId: pdId,
	// 			},
	// 		});
	// 		if (resp.data.message === 'Success') {
	// 			refetchProduct({ pdId });
	// 			setShowProduct(false);
	// 			setLabeledValue('list');
	// 		}
	// 	} catch (error) {
	// 		toast.error(error?.message);
	// 	}
	// };

	// const deleteProduct = async (productId, productClassificationId = '') => {
	// 	try {
	// 		const resp = await deleteProductApi.trigger({
	// 			params: {
	// 				productId,
	// 				userId: id,
	// 			},
	// 		});
	// 		if (resp.data.message === 'Success') {
	// 			refetchProduct({ productClassificationId });
	// 			fetch();
	// 		}
	// 	} catch (error) {
	// 		toast.error(error?.message);
	// 	}
	// };

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
		// addProductLoading: addApi.loading,
		refetchProduct,
		// addProduct,
		// deleteProduct,
	};
};

export default useProductList;
