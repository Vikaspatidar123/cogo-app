import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

function useGetPromotion() {
	const [{ loading, data: promotionData }, trigger] = useRequest({
		url    : '/get_app_dashboard_promotion',
		method : 'get',
	}, { manual: true });

	const getPromotionData = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			Toast.error(
				err?.message || ' Please try again.',
			);
		}
	}, [trigger]);

	useEffect(() => {
		getPromotionData();
	}, [getPromotionData]);
	return { loading, promotionData };
}
export default useGetPromotion;
