import { useEffect, useState } from 'react';
import { useRequest } from '@/packages/request';

const useFetchInvoiceList = () => {
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

	const fetchInvoiceList = async () => {
		try {
			await trigger({
				params: {
					page                     : pagination,
					pagination_data_required : true,
					filters                  : {
						q                          : searchValue,
						credit_export_factoring_id : '4bf91e88-b3eb-4ed9-ad2c-4a7d86a4f9b9',
						// creditRequest?.credit_export_factoring_id,
					},
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	useEffect(() => {
		if (pagination || searchValue) {
			fetchInvoiceList();
		}
	}, [pagination, searchValue]);

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
