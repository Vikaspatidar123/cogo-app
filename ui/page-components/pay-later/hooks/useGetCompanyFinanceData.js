import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetCompanyFinanceData = ({ id = '' }) => {
	console.log('🚀 ~ file: useGetCompanyFinanceData.js:6 ~ useGetCompanyFinanceData ~ id:', id);
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_company_finance_data',
	}, {
		autoCancel: false,
	});

	const getCompanyFinanceData = useCallback(async () => {
		try {
			await trigger({
				params: {
					credit_request_id: id,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [id, trigger]);

	useEffect(() => {
		if (id) {
			getCompanyFinanceData();
		}
	}, [getCompanyFinanceData, id]);

	return { getCompanyFinanceData, loading, data };
};
export default useGetCompanyFinanceData;
