/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { Toast } from '@cogoport/components';
import { setCookie } from '@cogoport/utils';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request/index';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useLoginAuthenticate = () => {
	const [{ loading: loginLoading }, trigger] = useRequest({
		url    : '/login_user',
		method : 'post',
	}, { manual: true });

	const onSubmit = async (values, e) => {
		e.preventDefault();
		try {
			const response = await
			trigger({
				data: {
					...values,
					auth_scope : 'organization',
					platform   : 'app',
				},
			});
			const { token } = response.data || {};
			setCookieAndRedirect(token, {});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to login, please try again...');
		}
	};

	return { onSubmit, loading: loginLoading };
};

export default useLoginAuthenticate;
