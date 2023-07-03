import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetPayments = () => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { token } = query || {};

	const [params, setParams] = useState({ page: 1, page_limit: 10 });

	const [searchValue, setSearchValue] = useState('');

	const [orderBy, setOrderBy] = useState({
		key   : '',
		order : '',
	});

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_dunning_additional_data',
		method : 'post',
	}, { manual: true });

	const fetchPaymentList = useCallback(async () => {
		try {
			await trigger({
				data: {
					...params,
					page_limit               : 10,
					token,
					data_required            : 'payment',
					sort_type                : orderBy.order || undefined,
					sort_by                  : orderBy.key || undefined,
					pagination_data_required : true,
					filters                  : {
						q: searchValue || undefined,
					},
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [orderBy, params, searchValue, token, trigger]);

	useEffect(() => {
		fetchPaymentList();
	}, [params, orderBy, searchValue, fetchPaymentList]);

	return {
		paymentListLoading : loading,
		paymentsData       : data || {},
		setParams,
		params,
		setOrderBy,
		orderBy,
		setSearchValue,
		searchValue,
	};
};

export default useGetPayments;
