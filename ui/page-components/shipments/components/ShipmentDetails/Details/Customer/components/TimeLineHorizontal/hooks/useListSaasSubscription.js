import { useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const ListSaasSubscriptions = () => {
	const { general } = useSelector((state) => state);
	const { query } = general;
	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_saas_container_subscriptions',
		method : 'get',
	}, { manual: false });

	const getList = async () => {
		await trigger({
			params: {
				filters: {
					organization_branch_id : query?.branch_id,
					status                 : 'active',
				},
				page,
				page_limit: 9,
			},
		});
	};

	useEffect(() => {
		if (query?.id) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id, page]);
	return {
		loading,
		data: data || {},
		setPage,
	};
};
export default ListSaasSubscriptions;
