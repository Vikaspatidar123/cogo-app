import { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetDsrList = () => {
	const [page, setPage] = useState(1);

	const { query } = useRouter();
	const { branch_id = '' } = query || {};
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_saas_dsr',
	}, { manual: true });

	const getDsrList = useCallback((pageNo) => {
		try {
			trigger({
				params: {
					filters: {
						organization_branch_id: branch_id,
					},
					page: pageNo,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	}, [branch_id, trigger]);

	useEffect(() => {
		getDsrList(page);
	}, [page, getDsrList]);

	return { data, loading, setPage };
};

export default useGetDsrList;
