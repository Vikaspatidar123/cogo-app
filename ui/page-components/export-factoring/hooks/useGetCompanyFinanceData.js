import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetCompanyFinanceData = ({ id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_credit_company_finance_data',
	}, {
		autoCancel: false,
	});

	const getCompanyFinanceData = useCallback(() => {
		try {
			trigger({
				params: {
					credit_id: id,
				},
			});
		} catch (e) {
			console.error(e);
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
