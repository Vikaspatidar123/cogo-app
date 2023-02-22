import { Toast } from '@cogoport/components';

// import { useSaasState } from '../../../common/context';

import useGetTradeEngine from './useGetTradeEngine';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePostTradeEngine = () => {
	const { profile } = useSelector((s) => s);
	const { id, organization } = profile || {};

	// const { trigger, loading } = useRequest('post', false, 'saas', {
	// 	authkey: 'post_saas_trade_engine',
	// })('/saas/trade-engine');

	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'post_saas_trade_engine',
		method  : 'post',
	}, { manual: true });

	const { getTradeEngineList, tradeEngineResponse, getTradeEngineListLoading } =		useGetTradeEngine();

	const createTradeEngine = async ({ draftIdFromAddon, billId, draftId }) => {
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
			// eslint-disable-next-line no-unused-expressions
			code === 'ERR_1000'
				? getTradeEngineList({ draftIdFromAddon, draftId })
				: Toast.error(error?.error?.message);
		}
	};
	return {
		createTradeEngine,
		createTradeEngineLoading: loading,
		tradeEngineResponse,
		getTradeEngineListLoading,
	};
};

export default usePostTradeEngine;
