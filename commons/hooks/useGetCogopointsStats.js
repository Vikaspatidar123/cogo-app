import { useEffect } from 'react';

import useRequest from '@/packages/request';
import { useDispatch, useSelector } from '@/packages/store';
import { setProfileState as setProfileStoreState } from '@/packages/store/reducers/profile';

const useGetCogopointsStats = ({ manual = false } = {}) => {
	const dispatch = useDispatch();

	const { profile } = useSelector((state) => state);
	const { trigger, loading } = useRequest(
		'get',
		false,
	)('/get_organization_cogopoint_profile');

	const getStats = async () => {
		try {
			const res = await trigger({
				params: {
					organization_id: profile.partner.twin_importer_exporter_id,
				},
			});

			if (Object.keys(res.data || {}).length > 0) {
				dispatch(
					setProfileStoreState({
						cogopoints: res?.data,
					}),
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!manual) {
			getStats();
		}
	}, []);

	return {
		stats: profile?.cogopoints,
		loading,
		getStats,
	};
};

export default useGetCogopointsStats;
