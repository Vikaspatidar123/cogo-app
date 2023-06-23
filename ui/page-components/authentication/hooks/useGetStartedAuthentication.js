import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getFormattedPayload = ({ formValues, user_id }) => ({
	...(formValues || {}),
	user_id,
	account_type: 'importer_exporter',
});

const useGetStartedAuthentication = ({ setMode = () => { } }) => {
	const { profile: { id: user_id = '' } } = useSelector((state) => state);

	const [{ loading: getStartedLoading }, trigger] = useRequest({
		url    : 'create_organization',
		method : 'post',
	}, { manual: true });

	const onGetStartedApi = async (formValues, e) => {
		e.preventDefault();

		try {
			const payload = getFormattedPayload({ formValues, user_id });

			await trigger({
				data: payload,
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
