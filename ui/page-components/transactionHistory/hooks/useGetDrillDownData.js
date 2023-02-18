import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useGetDrillDownData = () => {
	const [drillDownData, setDrillDownData] = useState({});

	const [{ drillDownLoading }, getDrillDownData] = useRequest({
		url    : 'payment/details',
		method : 'get',
	}, { manual: true });

	const refetchDrillDownData = async (billId) => {
		try {
			const resp = await getDrillDownData.trigger({
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
