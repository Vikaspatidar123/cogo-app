import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetOrganizationUsers = () => {
	const { profile } = useSelector((state) => state);

	const router = useRouter();

	const onClickBackButton = () => {
		router.push('/settings');
	};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { autoCancel: false });

	const getOrgUsers = useCallback(async () => {
		await trigger({
			params: {
				organization_id: profile?.organization?.id,
			},
		});
	}, [profile?.organization?.id, trigger]);

	useEffect(() => {
		getOrgUsers();
	}, [getOrgUsers]);

	return {
		users: data?.list,
		loading,
		onClickBackButton,
	};
};

export default useGetOrganizationUsers;
