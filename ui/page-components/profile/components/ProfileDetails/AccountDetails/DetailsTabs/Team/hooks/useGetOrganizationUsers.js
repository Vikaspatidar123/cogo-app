import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetOrganizationUsers = () => {
	const { push } = useRouter();

	const { profile } = useSelector((state) => state);

	const onClickBackButton = () => {
		push('/settings');
	};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { autoCancel: false });

	const getOrgUsers = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id: profile?.organization?.id,
				},
			});
		} catch (e) {
			console.error(e);
		}
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
