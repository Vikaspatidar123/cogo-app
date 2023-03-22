import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import useSelector from '@/packages/store';

const ListSaasSubscriptions = () => {
	const { query } = useSelector(({ general }) => ({
		scope : general?.scope,
		query : general?.query,
	}));
	const [{ loading }, data, trigger] = useRequest({
		url    : 'list_saas_container_subscriptions',
		method : 'get',
	}, { manual: true });

	const getList = async () => {
		await trigger({
			params: {
				filters: {
					organization_branch_id : query?.branch_id,
					status                 : 'active',
				},
			},
		});
	};

	useEffect(() => {
		if (query?.id) {
			getList();
		}
	}, [query?.id]);

	return {
		loading,
		data,
	};
};
export default ListSaasSubscriptions;
