import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetDraft = () => {
	const [{ loading, data: getDraftData }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/trade-engine/draft',
		authKey : 'get_saas_trade_engine_draft',
	}, { manual: true });

	const getDraft = useCallback(async (id) => {
		try {
			await trigger({
				params: {
					tradeEngineInputId: id,
				},
			});
		} catch (error) {
			Toast.error(error?.message || 'Something went Wrong');
		}
	}, [trigger]);

	return {
		loading, getDraftData, getDraft,
	};
};

export default useGetDraft;
