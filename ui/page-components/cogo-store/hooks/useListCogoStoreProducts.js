/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useListCogoStoreProducts = (listData = {}) => {
	const { categoryInfo = {}, brandList = [], rangeList = {} } = listData || {};
	const { categoryId = '', categoryName = '' } = categoryInfo;

	const { query } = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchValue, setSearchValue] = useState('');

	const { isBrand = false, id } = query || {};

	const { debounceQuery, query: debounceSearch } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url: '/list_cogostore_products',
		method: 'get',
	}, { manual: true });

	const getPayload = () => {
		const payload = {
			category_id: categoryId,
			search: debounceSearch,
			brand_id: !isEmpty(brandList) ? brandList : undefined,
			...rangeList,
		};
		return payload;
	};

	const getBrand = (brand_id) => {
		if (!isEmpty(brand_id)) {
			return brand_id;
		}
		return isBrand ? id : undefined;
	};

	const getListProducts = async ({
		category_id = undefined,
		product_id = undefined,
		category_label = undefined,
		search = undefined,
		brand_id = undefined,
		...rest
	}) => {
		const payload = {
			product_code_data_required: true,
			page_limit: 12,
			filters: {
				q: search,
				is_first_priority: true,
				is_stock_available: true,
				status: 'active',
				id: product_id,
				category_id: category_id || undefined,
				category_label,
				brand_id: getBrand(brand_id),
				...rest,
			},
			page: currentPage,
		};

		try {
			await trigger({
				params: { ...payload },
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (currentPage && !isEmpty(listData)) {
			const payload = getPayload();
			getListProducts(payload);
		}
	}, [currentPage]);

	useEffect(() => {
		if (!isEmpty(listData)) {
			if (categoryName || brandList || rangeList || debounceSearch) {
				const payload = getPayload();
				if (currentPage > 1) setCurrentPage(1);
				else getListProducts(payload);
			}
		}
	}, [categoryName, brandList, rangeList, debounceSearch]);

	useEffect(() => {
		if (searchValue !== undefined) {
			debounceQuery(searchValue);
		}
	}, [searchValue]);

	return {
		data,
		loading,
		getListProducts,
		setCurrentPage,
		currentPage,
		searchValue,
		setSearchValue,
	};
};

export default useListCogoStoreProducts;
