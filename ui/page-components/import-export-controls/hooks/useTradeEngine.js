import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { useSaasState } from '../../../common/context';

const useTradeEngine = ({ billId = undefined }) => {
	const [tradeEngineResp, setTradeEngineResp] = useState({});
	const tradeEngineRespLength = Object.keys(tradeEngineResp).length;
	const { profile = {} } = useSaasState();
	const { organization = {} } = profile || {};

	const getTransaction = useRequest('get', false, 'saas', {
		authkey: 'get_saas_trade_engine',
	})('/saas/trade-engine');

	const postTransaction = useRequest('post', false, 'saas', {
		authkey: 'post_saas_trade_engine',
	})('/saas/trade-engine');

	const getTradeEngine = async (id) => {
		try {
			const resp = await getTransaction.trigger({
				params: {
					tradeEngineInputId: id,
				},
			});
			setTradeEngineResp(resp?.data);
		} catch (err) {
			toast.error('Something went wrong! Please try after sometime', {
				style: { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	const postTradeEngine = async (id) => {
		try {
			const resp = await postTransaction.trigger({
				data: {
					performedBy: profile?.id,
					organizationId: organization?.id,
					tradeEngineInputId: id,
					paymentType: billId ? 'PAYMENT' : 'QUOTA',
					saasBillId: billId,
				},
			});
			if (resp?.data) {
				getTradeEngine(resp?.data?.id);
			}
		} catch (err) {
			if (
				err?.data?.message ===
				'Message Unknown Error :Data is Already Generated'
			) {
				getTradeEngine(id);
			} else {
				toast.error('Something went wrong! Please try after sometime', {
					style: { color: '#333', background: '#FFD9D4' },
				});
			}
		}
	};
	return {
		postTradeEngine,
		tradeEngineResp,
		tradeEngineLoading: postTransaction.loading || getTransaction.loading,
		tradeEngineRespLength,
	};
};

export default useTradeEngine;
