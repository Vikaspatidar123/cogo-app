import { useState, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetTradeEngine = ({ itm }) => {
	const [tradeEngineResponse, setTradeEngineResponse] = useState({});

	const [{ loading: tradeEngineResponseLoading }, tradeApitrigger] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
		method  : 'get',
	}, { manual: true });

	const tradeEngineResponseFunc = useCallback(async () => {
		try {
			const resp = await tradeApitrigger({
				params: {
					tradeEngineInputId: itm?.tradeEngineInputId || '',
				},
			});
			setTradeEngineResponse(resp?.data);
		} catch (error) {
			console.error(error);
		}
	}, [itm?.tradeEngineInputId, tradeApitrigger]);

	return {
		tradeEngineResponseFunc,
		tradeEngineResponse,
		tradeEngineResponseLoading,
	};
};
export default useGetTradeEngine;
