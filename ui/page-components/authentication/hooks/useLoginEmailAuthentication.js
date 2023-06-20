import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useLoginEmailAuthentication = ({ setMode = () => {} }) => {
	const { query = '' } = useRouter();
	const [{ loading: loginLoading }, trigger] = useRequest(
		{
			url    : 'user/login_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onSubmit = async (values, e) => {
		e.preventDefault();
		try {
			const response = await trigger({
				data: {
					...values,
					auth_scope : 'organization',
					platform   : 'app',
				},
			});

			const { token } = response.data || {};

			let redirectPath;

			if (query.redirectPath) {
				redirectPath = `${query.redirectPath}`;
			}

			setMode('loading_prompts');

			setCookieAndRedirect(token, {}, redirectPath);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Failed to Login, Please try again',
			);
		}
	};

	return { onSubmit, loginLoading };
};

export default useLoginEmailAuthentication;
