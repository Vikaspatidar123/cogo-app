import { Toast } from '@cogoport/components';
import { setCookie } from '@cogoport/utils';
import setCookieAndRedirect from '@/commons/utils/setCookieAndRedirect';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request/index';


const useLoginAuthenticate = () => {
	const [{ loading: loginLoading }, trigger] = useRequest({
		url: '/login_user',
		method: 'post',
	}, { manual: true });

	const onSubmit = async (values, e) => {
		e.preventDefault();
		try {
			const response = await
				trigger({
					data: {
						...values,
						auth_scope: 'organization',
						platform: 'app',
					},
				});
			const { token } = response.data || {};
			setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);
			setCookieAndRedirect(token, {});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to login, please try again...');
		}
	};

	return { onSubmit, loading: loginLoading };
};

export default useLoginAuthenticate;
