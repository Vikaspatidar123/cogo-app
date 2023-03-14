import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector, useDispatch } from '@/packages/store';
import { setProfileStoreState } from '@/packages/store/store/profile';

const useGetUser = () => {
	const dispatch = useDispatch();
	const profileData = useSelector(({ profile }) => profile);
	const [{ loading }, trigger] = useRequest({
		url    : '/get_user',
		method : 'get',
	}, { manual: true });

	const refetch = async () => {
		try {
			const resp = await trigger({});
			const { status = '', data } = resp || {};
			if (status === 200) {
				Toast.success('Successfull Update Languages');
			}
			if (data) {
				dispatch(
					setProfileStoreState({
						...profileData,
						...((data || {}).data || {}),
					}),
				);
			}
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return { refetch, loading };
};

export default useGetUser;
