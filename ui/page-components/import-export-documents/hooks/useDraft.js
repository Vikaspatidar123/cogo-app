import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useDraft = () => {
	const [draftResp, setDraftResp] = useState();
	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/trade-engine/documents/draft',
		authKey : 'post_saas_trade_engine_documents_draft',
	}, { manual: true });

	const refetchDraft = async ({ header, lineItem, hsCode = '' }) => {
		try {
			const resp = await trigger({
				data: {
					performedBy    : profile?.id,
					organizationId : organization?.id,
					source         : 'SAAS',
					header         : {
						...header,
						tradeEngineInputId: draftResp || header?.tradeEngineInputId,
					},
					lineItem: hsCode ? lineItem : null,
				},
			});
			setDraftResp(resp?.data?.id);
			return resp?.data?.id;
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	return {
		refetchDraft,
		draftLoading: loading,
	};
};

export default useDraft;
