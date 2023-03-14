import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTransactionHistory = ({ filters, sort }) => {
	const [apiResponse, setApiResponse] = useState({});
	const {
		profile,
	} = useSelector((state) => state);

	const [{ loading }, getTransactionHistoryTrigger] = useRequestBf({
		url     : '/saas/payment/history',
		authKey : 'get_saas_payment_history',
		method  : 'get',
	}, { manual: true });

	const refetchTransactionHistory = async () => {
		try {
			const response = await getTransactionHistoryTrigger({
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
			Toast.error(err.message);
		}
	};

	useEffect(() => {
		refetchTransactionHistory();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, sort]);

	return {
		apiResponse,
		refetchTransactionHistory,
		loading,
	};
};

export default useTransactionHistory;
