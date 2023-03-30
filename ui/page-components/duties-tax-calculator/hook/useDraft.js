import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useDraft = () => {
	const [draftResp, setDraftResp] = useState();
	const { profile = {} } = useSelector((s) => s);
	const { organization = {} } = profile || {};
	const { query } = useRouter();
	const { billId = '' } = query || {};

	const [{ loading:draftLoading }, triggerDraft] = useRequestBf({
		url     : 'saas/trade-engine/duties/draft',
		authKey : 'post_saas_trade_engine_duties_draft',
		method  : 'post',
	}, { manual: true });

	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/saas/trade-engine/draft',
		authKey : 'get_saas_trade_engine_draft',
		method  : 'get',
	}, { manual: true });

	const refetchDraft = async ({ header, lineItem, isQuotaLeft = false }) => {
		let draftId;
		if (!isQuotaLeft) {
			draftId = localStorage.getItem('draftId') || null;
		}
		try {
			const resp = await triggerDraft({
				data: {
					performedBy    : profile?.id,
					organizationId : organization?.id,
					source         : 'SAAS',
					header         : {
						...header,
						tradeEngineInputId: draftResp || header?.tradeEngineInputId || draftId,
					},
					lineItem,
				},
			});
			setDraftResp(resp?.data?.id);
			if (!isQuotaLeft && billId === '') localStorage.setItem('draftId', resp?.data?.id);
			return resp?.data?.id;
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime');
			return null;
		}
	};

	const getDraftFn = async (id) => {
		try {
			await trigger({
				params: {
					tradeEngineInputId: id,
				},
			});
		} catch (err) {
			console.log(err?.error?.message);
		}
	};

	return {
		refetchDraft,
		draftLoading,
		getDraftFn,
		getDraftData    : data,
		getDraftloading : loading,
	};
};

export default useDraft;
