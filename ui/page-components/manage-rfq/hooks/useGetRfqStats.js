import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetRfqStats = () => {
	const { importer_exporter_id } = useSelector(({ general }) => ({
		scope                : general.scope,
		importer_exporter_id : general?.query?.org_id,
	}));

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_rfq_stats',
	}, { manual: true });

	const getRfqStats = useCallback(async () => {
		await trigger({
			params: {
				importer_exporter_id,
			},
		});
	}, [importer_exporter_id, trigger]);

	useEffect(() => {
		getRfqStats();
	}, [getRfqStats]);

	return {
		loading,
		getRfqStats,
		data,
	};
};

export default useGetRfqStats;
