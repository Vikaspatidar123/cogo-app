import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector, useDispatch } from '@/packages/store';
import { setProfileStoreState } from '@/packages/store/store/profile';

const useGetCogopoints = () => {
	const dispatch = useDispatch();

	const { profile } = useSelector((state) => state);

	const [{ loading, data: cogoInfo }, trigger] = useRequest(
		{
			url    : '/get_cogopoint_user_profile',
			method : 'get',
		},
		{ manual: true },
	);

	const [{ data: info }, triggerUser] = useRequest(
		{
			url    : '/create_cogopoint_user',
			method : 'post',
		},
		{ manual: true },
	);

	const getStats = async () => {
		const res = await trigger({
			params: {
				organization_id: profile?.organization?.id,
			},
		});
		const { data = {} } = res || {};
		const { user_exist = true, id } = data || {};
		if (id) {
			await dispatch(
				setProfileStoreState({
					...profile,
					cogopoint_id: id,
				}),
			);
		}
		if (!user_exist) {
			triggerUser({});
		}
	};

	useEffect(() => {
		getStats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		stats: info || cogoInfo,
		loading,
		getStats,
	};
};

export default useGetCogopoints;
