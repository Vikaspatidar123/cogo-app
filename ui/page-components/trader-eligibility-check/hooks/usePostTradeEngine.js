import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import useGetTradeEngine from './useGetTradeEngine';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePostTradeEngine = () => {
	const { profile } = useSelector((s) => s);
	const { id, organization } = profile || {};

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/saas/trade-engine',
			authKey : 'post_saas_trade_engine',
			method  : 'post',
		},
		{ manual: true },
	);

	const { getTradeEngineList, tradeEngineResponse, getTradeEngineListLoading } = useGetTradeEngine();

	const createTradeEngine = useCallback(async ({ draftIdFromAddon, billId, draftId }) => {
		try {
			const res = await trigger({
				data: {
					performedBy        : id,
					organizationId     : organization?.id,
					paymentType        : billId ? 'PAYMENT' : 'QUOTA',
					saasBillId         : billId || null,
					tradeEngineInputId : draftIdFromAddon || draftId,
				},
			});
			if (res?.data) {
				getTradeEngineList({ draftIdFromAddon, draftId });
			}
		} catch (error) {
			const code = error?.error?.errorCode || '';
			if (code === 'ERR_1000') {
				getTradeEngineList({ draftIdFromAddon, draftId });
			} else {
				Toast.error(error?.error?.message);
			}
		}
	}, [getTradeEngineList, id, organization?.id, trigger]);

	return {
		createTradeEngine,
		createTradeEngineLoading: loading,
		tradeEngineResponse,
		getTradeEngineListLoading,
	};
};

export default usePostTradeEngine;
