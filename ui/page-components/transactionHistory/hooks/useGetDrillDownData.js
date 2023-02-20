import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetDrillDownData = () => {
	const [drillDownData, setDrillDownData] = useState({});

	const [{ drillDownLoading }, getDrillDownDataTrigger] = useRequestBf({
		url     : 'saas/payment/details',
		authKey : 'get_saas_payment_details',
		method  : 'get',
	}, { manual: true });

	const refetchDrillDownData = async (billId) => {
		try {
			const resp = await getDrillDownDataTrigger({
				params: {
					billId,
				},
			});
			setDrillDownData(resp?.data);
		} catch (err) {
			Toast.error(err);
		}
	};

	return {
		refetchDrillDownData,
		drillDownData,
		drillDownLoading,
	};
};
export default useGetDrillDownData;
