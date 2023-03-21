import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSignupAuthentication = ({
	setHasSignedup, setUserDetails, captchaResponse, hasWhatsApp, userInfo,
}) => {
	const [{ loading: signupLoading }, trigger] = useRequest({
		url    : 'saas_tools/update_saas_converted_user_mobile',
		method : 'post',
	}, { manual: true });

	const signupAuthentication = async (val) => {
		const payload = {
			email                     : val.email,
			name                      : val.name,
			mobile_number             : val.mobile_number.number,
			mobile_country_code       : val.mobile_number.country_code,
			google_recaptcha_response : captchaResponse,
			is_whatsapp_number        : hasWhatsApp,
		};
		try {
			const res = await trigger({
				data: {
					...payload,
				},
			});

			if (res?.status === 200) {
				const { data } = res || {};
				setHasSignedup(true);
				const userDetails = {
					...payload,
					...data,
					...userInfo,
				};

				setUserDetails(userDetails);
			}
		} catch (e) {
			if (e?.response?.data?.email?.length > 0) {
				Toast.error('Email id is already registered. Please Login');
			} else {
				Toast.error('Something went wrong');
			}
		}
	};

	return {
		signupLoading,
		signupAuthentication,
	};
};

export default useSignupAuthentication;
