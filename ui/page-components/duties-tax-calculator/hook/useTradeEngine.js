import toast from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTradeEngine = () => {
	const [tradeEngineResp, setTradeEngineResp] = useState({});
	const tradeEngineRespLength = Object.keys(tradeEngineResp).length;
	const { profile = {} } = useSelector((s) => s);
	const { organization = {} } = profile || {};

	const [{ loading:getTransactionLoading }, triggerGetTransaction] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
		method  : 'get',
	}, { manual: true });

	const [{ loading:postTransactionLoading }, triggerPostTransaction] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'post_saas_trade_engine',
		method  : 'post',
	}, { manual: true });

	const getTradeEngine = async (id) => {
		try {
			const resp = await triggerGetTransaction({
				params: {
					tradeEngineInputId: id,
				},
			});
			setTradeEngineResp(resp?.data);
		} catch (err) {
			toast.error('Something went wrong! Please try after sometime', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	const postTradeEngine = async (id, mode, saasBillId = '') => {
		try {
			const resp = await triggerPostTransaction.trigger({
				data: {
					performedBy        : profile?.id,
					organizationId     : organization?.id,
					tradeEngineInputId : id,
					paymentType        : mode || 'QUOTA',
					saasBillId,
				},
			});
			if (resp?.data) {
				getTradeEngine(resp?.data?.id);
			}
		} catch (err) {
			toast.error('Something went wrong! Please try after sometime', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};
	return {
		postTradeEngine,
		tradeEngineResp,
		tradeEngineLoading: postTransactionLoading || getTransactionLoading,
		tradeEngineRespLength,
	};
};

export default useTradeEngine;
