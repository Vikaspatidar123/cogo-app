import { useEffect } from 'react';
import useRequest from '@/temp/request/useRequest';
import { useDispatch, useSelector } from '@cogoport/front/store';
import { setProfileStoreState } from '@/utils/stores';

const useGetServiceStatus = () => {
	const dispatch = useDispatch();

	const { profile, general } = useSelector((state) => state);
	const scope = general?.scope;

	const { trigger } = useRequest('get', false, scope)('/get_service_status');
	console.log(scope, 'scope');

	const getServiceStatus = async () => {
		const res = await trigger({
			params: {
				platform: scope,
				service: 'webbot',
			},
		});

		dispatch(
			setProfileStoreState({
				showWebBot: res?.data,
			}),
		);
	};

	useEffect(() => {
		getServiceStatus();
	}, []);

	return {
		showWebBot: profile?.showWebBot,
	};
};

export default useGetServiceStatus;
