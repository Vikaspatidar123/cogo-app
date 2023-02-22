import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useService = () => {
	const [{ loading }, serviceTrigger, data] = useRequest({
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
			Toast.error(err);
		}
	};

	return {
		getService,
		transactionData: data,
		loading,
	};
};
export default useService;
