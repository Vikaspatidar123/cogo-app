import { Toast } from '@cogoport/components';
import { useCallback, useRef } from 'react';

import useGetTradeEngine from './useGetTradeEngine';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePostTradeEngine = () => {
	const tradeEngineInputId = useRef('');

	const { profile } = useSelector((state) => state);
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
		tradeEngineInputId.current = draftIdFromAddon || draftId;

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
			if (res?.data && (draftIdFromAddon || draftId)) {
				getTradeEngineList({ draftIdFromAddon, draftId });
			}
		} catch (error) {
			const code = error?.response?.data?.errorCode || '';
			if (code === 'ERR_1000') {
				getTradeEngineList({ draftIdFromAddon, draftId });
			} else {
				Toast.error(error?.error?.message);
			}
		}
	}, [getTradeEngineList, id, organization?.id, trigger]);

	return {
		createTradeEngine,
		tradeEngineResponse,
		getTradeEngineListLoading: loading || getTradeEngineListLoading,
		tradeEngineInputId,
	};
};

export default usePostTradeEngine;
