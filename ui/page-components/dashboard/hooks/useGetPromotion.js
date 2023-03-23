import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

function useGetPromotion() {
	const [{ loading, data: promotion_data }, trigger] = useRequest({
		url    : '/get_app_dashboard_promotion',
		method : 'get',
	}, { manual: true });

	const promotionData = async () => {
		try {
			const res = await trigger();
			const { datas } = res;
			return datas;
		} catch (err) {
			Toast.error(
				err?.message || ' Please try again.',
			);
			return null;
		}
	};

	useEffect(() => {
		promotionData();
	}, []);
	return { loading, promotionData, promotion_data };
}
export default useGetPromotion;
