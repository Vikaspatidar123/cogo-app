import { useCallback, useEffect } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const DEFAULT_PAGE_LIMIT = 2;

const useTrackShipment = () => {
	const { query } = useRouter();
	const { branch_id } = query;

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_container_subscriptions_summary',
	}, { manual: true });

	const getSummary = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						organization_branch_id: branch_id,
					},
					filter_data_required : true,
					page_limit           : DEFAULT_PAGE_LIMIT,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [branch_id, trigger]);

	useEffect(() => {
		getSummary();
	}, [getSummary]);

	return {
		data,
		loading,
	};
};

export default useTrackShipment;
