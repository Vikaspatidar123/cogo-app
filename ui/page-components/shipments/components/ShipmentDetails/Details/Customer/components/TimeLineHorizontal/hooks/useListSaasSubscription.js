import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const ListSaasSubscriptions = () => {
	const { general } = useSelector((state) => state);
	const { query } = general;

	const [{ loading, data }, trigger] = useRequest({
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	return {
		loading,
		data,
	};
};
export default ListSaasSubscriptions;
