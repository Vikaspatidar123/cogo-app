import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getTransportMapping } from '../constant/transportMapping';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getPayloadData = ({ data, formInfo = {}, getDraftData, t }) => {
	const { lineItem: getDraftLineItem = [] } = getDraftData || {};
	const { tradeEngineLineItemInputId } = getDraftLineItem?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const TRANSPORT_MAPPING = getTransportMapping({ t });

	const header = {
		originCountryCode: formInfo?.exportCountry?.country_code,
		destinationCountryCode: formInfo?.importCountry?.country_code,
		modeOfTransport: TRANSPORT_MAPPING?.[formInfo?.transportMode],
		tradeEngineInputId: formInfo?.tradeEngineInputId,
	};
	const lineItem = [
		{
			originCN: '',
			manufactureOrigin:
				formInfo?.manufacturingCountry?.country_code
				|| formInfo?.exportCountry?.country_code,
			originHs: data?.exportHsCode,
			destinationHs: data?.importHsCode,
			productName: data?.productName || '',
			tradeEngineLineItemInputId,
		},
	];
	return {
		header,
		lineItem,
	};
};

const useDraft = () => {
	const { t } = useTranslation(['importExport']);

	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile;
	const [draftResp, setDraftResp] = useState('');

	const [{ loading }, trigger] = useRequestBf({
		method: 'post',
		url: '/saas/trade-engine/controls/draft',
		authKey: 'post_saas_trade_engine_controls_draft',
	}, { manual: true });

	const [{ loading: getDraftLoading, data: getDraftData }, getDraftTrigger] = useRequestBf({
		method: 'get',
		url: '/saas/trade-engine/draft',
		authKey: 'get_saas_trade_engine_draft',
	}, { manual: true });

	const refetchDraft = async (props) => {
		const { header, lineItem } = getPayloadData({ ...props, getDraftData, t });
		try {
			const resp = await trigger({
				data: {
					performedBy: profile?.id,
					organizationId: organization?.id,
					source: 'SAAS',
					header: {
						...header,
						tradeEngineInputId: draftResp || header?.tradeEngineInputId,
					},
					lineItem,
				},
			});
			setDraftResp(resp?.data?.id);
			return resp?.data?.id;
		} catch (err) {
			console.error(err);
			return false;
		}
	};

	const getDraftFn = async (id) => {
		try {
			await getDraftTrigger({
				params: {
					tradeEngineInputId: id,
				},
			});
		} catch (err) {
			console.error(err?.error?.message);
		}
	};

	return {
		refetchDraft,
		draftLoading: getDraftLoading || loading,
		getDraftFn,
	};
};

export default useDraft;
