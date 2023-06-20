import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useSaasSignupAuthentication = ({
	setHasSignedup, setUserDetails, captchaResponse, hasWhatsApp, userInfo,
}) => {
	const [{ loading: signupLoading }, trigger] = useRequest({
		url    : '/lead/create_sign_up_lead_user',
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
				showErrorsInToast(e?.response?.data);
			}
		}
	};

	return {
		signupLoading,
		signupAuthentication,
	};
};

export default useSaasSignupAuthentication;
