import { useCallback } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetTradeEngine = () => {
	const [{ data, loading }, trigger] = useRequestBf({
		url     : 'saas/trade-engine',
		authKey : 'get_saas_trade_engine',
		method  : 'get',
	}, { manual: true });

	const getTradeEngineList = useCallback(async ({ draftId, draftIdFromAddon }) => {
		try {
			if (draftId || draftIdFromAddon) {
				await trigger({
					params: {
						tradeEngineInputId: draftIdFromAddon || draftId,
					},
				});
			}
		} catch (error) {
			console.error(error?.error?.message);
		}
	}, [trigger]);

	return {
		getTradeEngineList,
		getTradeEngineListLoading : loading,
		tradeEngineResponse       : data,
	};
};
export default useGetTradeEngine;
