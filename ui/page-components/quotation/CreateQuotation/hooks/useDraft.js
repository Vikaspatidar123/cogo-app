import { Toast } from '@cogoport/components';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useDraft = () => {
	const { id, organization } = useSelector((state) => state);

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/trade-engine/draft',
		authKey : 'post_saas_trade_engine_draft',
	}, { manual: true });

	const refetchDraft = async () => {
		try {
			const resp = await trigger({
				data: {
					performedBy    : id,
					organizationId : organization?.id,
					source         : 'SAAS',
				},
			});
			return resp?.data?.id;
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime');
			return null;
		}
	};

	return {
		refetchDraft,
	};
};

export default useDraft;
