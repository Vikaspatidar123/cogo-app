/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request/index';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useLoginAuthenticate = () => {
	const { query = '' } = useRouter();
	const [{ loading: loginLoading }, trigger] = useRequest(
		{
			url    : '/login_user',
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
				redirectPath = `/v2/${query.redirectPath}`;
			}
			setCookieAndRedirect(token, {}, redirectPath);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
          || 'Failed to login, please try again...',
			);
		}
	};

	return { onSubmit, loading: loginLoading };
};

export default useLoginAuthenticate;
