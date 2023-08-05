import { useRequestBf } from '@/packages/request';

const useGetTradeEngine = ({ tradeEngineInputId }) => {
	const [{ loading, data }] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
		method  : 'get',
		params  : {
			tradeEngineInputId: tradeEngineInputId || '',
		},
	}, { manual: false });

	return {
		tradeEngineResponse: data,
		loading,
	};
};
export default useGetTradeEngine;
