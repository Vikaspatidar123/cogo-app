import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTradeEngine = () => {
	const { t } = useTranslation(['dutiesTaxesCalculator']);

	const { profile = {} } = useSelector((s) => s);
	const tradeEngineInputId = useRef('');

	const { organization = {} } = profile || {};

	const [{ loading: getTransactionLoading, data:tradeEngineResp }, triggerGetTransaction] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
		method  : 'get',
	}, { manual: true });

	const [{ loading: postTransactionLoading }, triggerPostTransaction] = useRequestBf({
		url     : '/saas/trade-engine',
		authKey : 'post_saas_trade_engine',
		method  : 'post',
	}, { manual: true });

	const isTradeEngineRespEmpty = isEmpty(tradeEngineResp);

	const getTradeEngine = (id) => {
		try {
			triggerGetTransaction({
				params: {
					tradeEngineInputId: id,
				},
			});
		} catch (err) {
			Toast.error(t('dutiesTaxesCalculator:api_err_msg'));
		}
	};

	const postTradeEngine = async (id, mode, saasBillId = '') => {
		tradeEngineInputId.current = id;
		try {
			const resp = await triggerPostTransaction({
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
			Toast.error(t('dutiesTaxesCalculator:api_err_msg'));
		}
	};
	return {
		postTradeEngine,
		tradeEngineResp    : { ...tradeEngineResp, trade_engine_id: tradeEngineInputId.current },
		tradeEngineLoading : postTransactionLoading || getTransactionLoading,
		isTradeEngineRespEmpty,
	};
};

export default useTradeEngine;
