import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';

const useFetchInvoiceList = ({
	getCreditRequestResponse,
}) => {
	const [searchValue, setSearchValue] = useState('');
	const [pagination, setPagination] = useState(1);

	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/get_ef_invoices',
		},
		{
			manual     : true,
			autoCancel : false,
		},
	);

	const fetchInvoiceList = useCallback(async () => {
		try {
			await trigger({
				params: {
					page                     : pagination,
					pagination_data_required : true,
					filters                  : {
						q                          : searchValue,
						credit_export_factoring_id : getCreditRequestResponse?.credit_export_factoring_id,
					},
				},
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [getCreditRequestResponse?.credit_export_factoring_id, pagination, searchValue, trigger]);

	useEffect(() => {
		if (pagination || searchValue) {
			fetchInvoiceList();
		}
	}, [fetchInvoiceList, pagination, searchValue]);

	return {
		fetchInvoiceList,
		setSearchValue,
		setPagination,
		pagination,
		searchValue,
		loading,
		data,
	};
};

export default useFetchInvoiceList;
