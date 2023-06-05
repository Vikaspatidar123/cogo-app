import { Toast } from '@cogoport/components';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useGetStartedAuthentication = ({ setMode = () => { } }) => {
	const { profile: { id = '' } } = useSelector((state) => state);

	const [{ loading: getStartedLoading }, trigger] = useRequest({
		url    : 'create_organization',
		method : 'post',
	}, { manual: true });

	const onGetStartedApi = async (val, e) => {
		e.preventDefault();
		try {
			const payload = {
				...val,
				user_id      : id,
				account_type : 'importer_exporter',
			};
			const response = await trigger({
				data: {
					...payload,
				},
			});

			setMode('loading_prompts');
			window.location.href = '/';
		} catch (err) {
			if (err?.response?.data?.email?.length > 0) {
				Toast.error('Email id is already registered. Please Login');
			} else {
				Toast.error('Something went wrong');
			}
		}
	};

	return {
		onGetStartedApi,
		getStartedLoading,
	};
};

export default useGetStartedAuthentication;
