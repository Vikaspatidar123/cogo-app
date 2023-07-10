import { Toast } from '@cogoport/components';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTradeEngine = () => {
	const { id, organization } = useSelector((state) => state.profile);
	const { query } = useRouter();
	const { billId = '' } = query || {};

	const [{ loading: getLoading, data: transactionResp = {} }, getTransactionTrigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
	}, { manual: true });

	const [{ loading: postLoading }, postTransaction] = useRequestBf({
		method  : 'post',
		url     : '/saas/trade-engine',
		authKey : 'post_saas_trade_engine',
	}, { manual: true });

	const getTradeEngine = useCallback(async (tradeEngineInputId) => {
		try {
			await getTransactionTrigger({
				params: {
					tradeEngineInputId,
				},
			});
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime');
		}
	}, [getTransactionTrigger]);

	const postTradeEngine = useCallback(async ({ tradeEngineInputId, paymentMode }) => {
		try {
			const resp = await postTransaction({
				data: {
					performedBy    : id,
					organizationId : organization?.id,
					tradeEngineInputId,
					paymentType    : paymentMode || 'QUOTA',
					saasBillId     : billId,
				},
			});
			if (resp?.data) {
				getTradeEngine(resp?.data?.id);
			}
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime');
		}
	}, [billId, getTradeEngine, id, organization?.id, postTransaction]);
	return {
		postTradeEngine,
		transactionResp,
		tradeEngineLoading: getLoading || postLoading,
	};
};

export default useTradeEngine;
