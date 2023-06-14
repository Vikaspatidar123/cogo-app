import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetCogopointsRules = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogopoint_milestones',
		method : 'get',
	}, { manual: true });

	const getlist = useCallback(async () => {
		try {
			await trigger({
				filters: { status: 'active', organization_type: 'importer_exporter' },
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger]);

	useEffect(() => {
		getlist();
	}, [getlist]);

	return {
		loading,
		list: data?.list,
		getlist,
	};
};

export default useGetCogopointsRules;
