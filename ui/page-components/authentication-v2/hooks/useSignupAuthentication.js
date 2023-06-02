import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSignupAuthentication = ({
	setMode, setUserDetails, captchaResponse, hasWhatsApp, profileId,
}) => {
	const [{ loading: signupLoading }, trigger] = useRequest({
		url    : 'create_saas_sign_up_lead_user',
		method : 'post',
	}, { manual: true });

	const signupAuthentication = async (val, e) => {
		e.preventDefault();
		try {
			const payload = {
				profile_id                : profileId || undefined,
				name                      : val.name,
				email                     : val.email,
				mobile_country_code       : val.mobile_number.country_code,
				mobile_number             : val.mobile_number.number,
				business_name             : val.business_name,
				country_id                : val.country_id,
				google_recaptcha_response : captchaResponse,
				is_whatsapp_number        : hasWhatsApp,
			};
			const res = await trigger({
				data: {
					...payload,
				},
			});

			if (res?.status === 200) {
				const { data } = res || {};
				setMode('otp_form');
				setUserDetails((prev) => ({
					...prev,
					...data,
				}));
			}
		} catch (err) {
			if (err?.response?.data?.email?.length > 0) {
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
