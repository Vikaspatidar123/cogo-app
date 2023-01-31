import { Toast } from '@cogoport/components';
import { setCookie } from '@cogoport/utils';
import { useEffect } from 'react';

import redirections from '../utils/redirections';

import setCookieAndRedirect from '@/commons/utils/setCookieAndRedirect';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request/index';
import { useDispatch, useSelector } from '@/packages/store';
import { setProfileState } from '@/packages/store/store/profile';

const useLoginAuthenticate = () => {
	const { push } = useRouter();
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
			const redirectUrl = '/';
			setCookieAndRedirect(token, {}, redirectUrl);
			// const res = await triggerSession();
			// dispatch(setProfileState(res.data));
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to login, please try again...');
		}
	};

	return { onSubmit, loading: loginLoading };
};

export default useLoginAuthenticate;
