import { Toast } from '@cogoport/components';

import setCookieAndRedirect from '@/commons/utils/setCookieAndRedirect';
import { useRequest } from '@/packages/request';

function useLogin({ CONSTANTS = {}, action = '' }) {
	const {
		COMPONENT_KEYS: { MOBILE_NO },
	} = CONSTANTS;

	const mobileNoLoginApi = useRequest({
		url: 'user/login_user_with_mobile',
		method: 'post',
	}, { manual: true });

	const emailLoginApi = useRequest({
		url: 'user/login_user',
		method: 'post',
	}, { manual: true });

	const api = action === MOBILE_NO ? mobileNoLoginApi : emailLoginApi;

	const getPayload = ({ values = {} }) => {
		let payload = {};
		if (action === 'email') {
			payload = {
				...values,
			};
		} else {
			const {
				userId = '',
				mobileCountryCode = '',
				mobileNumber = '',
				otp = '',
			} = values;

			payload = {
				id: userId,
				mobile_country_code: mobileCountryCode,
				mobile_number: mobileNumber,
				mobile_otp: otp,
			};
		}

		return {
			...payload,
			auth_scope: 'partner',
			platform: 'partner',
		};
	};

	const onSuccess = ({ response = {} }) => {
		const redirectUrl = '/dashboard';

		const { token = '' } = response;
		setCookieAndRedirect(token, redirectUrl);
	};

	const onFailure = (error) => {
		if (Object.keys(error.data || {}).includes('no')) {
			Toast.error(['Email or Password is incorrect']);
		} else {
			Toast.error(error.data);
		}
	};

	const login = async ({ values = {} }) => {
		try {
			const payload = getPayload({ values });

			const response = await api.trigger({ data: payload });

			onSuccess({ response: response.data });
		} catch (error) {
			onFailure(error);
		}
	};

	return {
		loading: api.loading,
		login,
	};
}

export default useLogin;
