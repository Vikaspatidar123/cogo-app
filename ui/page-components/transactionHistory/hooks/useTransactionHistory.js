import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTransactionHistory = ({ filters, sort }) => {
	const [apiResponse, setApiResponse] = useState({});
	const {
		profile,
	} = useSelector((state) => state);

	const [{ loading }, getTransactionHistory] = useRequest({
		url    : 'payment/history',
		method : 'get',
	}, { manual: true });

	const refetchTransactionHistory = async () => {
		try {
			const response = await getTransactionHistory.trigger({
				params: {
					source     : 'SAAS',
					orgId      : profile?.organization?.id,
					page       : filters?.pageNo,
					pageLimit  : filters?.pageLimit,
					sortBy     : 'BILL_DATE',
					sortType   : sort?.sortType,
					searchTerm : filters?.searchTerm,
					billType   : filters?.bill_type,
					billStatus : filters?.payment_status,
					startDate  : filters?.startDate,
					endDate    : filters?.endDate,
				},
			});
			setApiResponse(response?.data);
		} catch (err) {
			console.error(err, 'err');
		}
	};

	useEffect(() => {
		if (filters || sort) {
			refetchTransactionHistory();
		}
	}, [filters, sort]);
	return {
		apiResponse,
		refetchTransactionHistory,
		loading,
	};
};

export default useTransactionHistory;
