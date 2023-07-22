import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const ERROR_MESSAGE = 'Unknown Error :Data is Already Generated';

const useTradeEngine = ({ billId = undefined }) => {
	const { t } = useTranslation(['importExportControls']);

	const { profile = {} } = useSelector((s) => s);
	const { organization = {} } = profile || {};

	const [tradeEngineResp, setTradeEngineResp] = useState({});
	const tradeEngineRespLength = Object.keys(tradeEngineResp).length;

	const [{ loading }, getTransaction] = useRequestBf({
		method  : 'get',
		url     : '/saas/trade-engine',
		authKey : 'get_saas_trade_engine',
	}, { manual: true });

	const [{ loading: load }, postTransaction] = useRequestBf({
		method  : 'post',
		url     : '/saas/trade-engine',
		authKey : 'post_saas_trade_engine',
	}, { manual: true });

	const getTradeEngine = async (id) => {
		try {
			const resp = await getTransaction({
				params: {
					tradeEngineInputId: id,
				},
			});
			setTradeEngineResp(resp?.data);
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime', {
				style: { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	const postTradeEngine = async (id) => {
		try {
			const resp = await postTransaction({
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
			if (err?.response?.data?.message === ERROR_MESSAGE) {
				getTradeEngine(id);
			} else {
				Toast.error(t('importExportControls:api_error'));
			}
		}
	};
	return {
		postTradeEngine,
		tradeEngineResp,
		tradeEngineLoading: loading || load,
		tradeEngineRespLength,
	};
};

export default useTradeEngine;
