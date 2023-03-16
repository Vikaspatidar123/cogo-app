import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useDraft = () => {
	const { id, organization } = useSelector((state) => state.profile);

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/trade-engine/draft',
		authKey : 'post_saas_trade_engine_draft',
	}, { manual: true });

	const refetchDraft = async ({ draftHeader, lineItem }) => {
		try {
			const resp = await trigger({
				data: {
					performedBy    : id,
					organizationId : organization?.id,
					source         : 'SAAS',
					header         : draftHeader,
					lineItem,
				},
			});
			return resp?.data?.id;
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime');
			return false;
		}
	};

	return {
		refetchDraft,
		draftLoading: loading,
	};
};

export default useDraft;
