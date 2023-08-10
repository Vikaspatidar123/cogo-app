import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTradeEngine = ({ billId = null }) => {
	const { t } = useTranslation(['importExportDoc']);

	const { profile } = useSelector((state) => state);

	const [tradeEngineResp, setTradeEngineResp] = useState({});

	const tradeEngineRespLength = Object.keys(tradeEngineResp).length;
	const { organization = {} } = profile || {};

	const [{ loading: postLoading }, postTrigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/trade-engine',
		authKey : 'post_saas_trade_engine',
	}, { manual: true });

	const [{ loading: getLoading }, getTrigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
	}, { manual: true });

	const getTradeEngine = async (id) => {
		try {
			const resp = await getTrigger({
				params: {
					tradeEngineInputId: id,
				},
			});
			setTradeEngineResp(resp?.data);
		} catch (err) {
			Toast.error(t('importExportDoc:api_error'));
		}
	};

	const postTradeEngine = async (id) => {
		try {
			const resp = await postTrigger({
				data: {
					performedBy        : profile?.id,
					organizationId     : organization?.id,
					tradeEngineInputId : id,
					paymentType        : billId ? 'PAYMENT' : 'QUOTA',
					saasBillId         : billId,
				},
			});
			if (resp?.data) {
				getTradeEngine(resp?.data?.id);
			}
		} catch (err) {
			if (err?.response?.data?.message === 'Unknown Error :Data is Already Generated') {
				getTradeEngine(id);
			} else {
				Toast.error(t('importExportDoc:api_error'));
			}
		}
	};
	return {
		postTradeEngine,
		tradeEngineResp,
		tradeEngineLoading: postLoading || getLoading,
		tradeEngineRespLength,
	};
};

export default useTradeEngine;
