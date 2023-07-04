import { useRequestBf } from '@/packages/request';

const useService = () => {
	const [{ loading, data }, serviceTrigger] = useRequestBf({
		url     : 'saas/trade-engine',
		authKey : 'get_saas_trade_engine',
		method  : 'get',
	}, { manual: true });

	const getService = async (billRefId = '') => {
		try {
			await serviceTrigger({
				params: {
					tradeEngineInputId: billRefId,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		getService,
		transactionData: data,
		loading,
	};
};
export default useService;
