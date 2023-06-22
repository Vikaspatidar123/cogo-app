import { useState } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetTradeEngine = ({ itm }) => {
	const [tradeEngineResponse, setTradeEngineResponse] = useState({});

	const [{ loading: tradeEngineResponseLoading }, tradeApitrigger] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
		method  : 'get',
	}, { manual: true });

	const TradeEngineResponseFunc = async () => {
		try {
			const resp = await tradeApitrigger({
				params: {
					tradeEngineInputId: itm?.tradeEngineInputId || '',
				},
			});
			setTradeEngineResponse(resp?.data);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		TradeEngineResponseFunc,
		tradeEngineResponse,
		tradeEngineResponseLoading,
	};
};
export default useGetTradeEngine;
