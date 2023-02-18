import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useService = () => {
	const [{ loading }, service, data] = useRequest({
		url    : 'trade-engine',
		method : 'get',
	}, { manual: true });

	const getService = async (billRefId = '') => {
		try {
			await service.trigger({
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
