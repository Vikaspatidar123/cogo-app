import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSignupAuthentication = ({
	setMode, setUserDetails, captchaResponse, leadUserId,
}) => {
	const [{ loading: signupLoading }, trigger] = useRequest({
		url    : 'create_sign_up_lead_user',
		method : 'post',
	}, { manual: true });

	const signupAuthentication = async (val, e) => {
		e.preventDefault();

		try {
			const payload = {
				lead_user_id              : leadUserId || undefined,
				name                      : val.name,
				email                     : val.email,
				mobile_country_code       : val.mobile_number.country_code,
				mobile_number             : val.mobile_number.number,
				is_whatsapp_number        : val.is_whatsapp_number,
				business_name             : val.business_name,
				country_id                : val.country_id,
				google_recaptcha_response : captchaResponse,
			};

			const res = await trigger({
				data: {
					...payload,
				},
			});

			const { data } = res || {};

			setMode('otp_form');

			setUserDetails((prev) => ({
				...prev,
				...data,
			}));
		} catch (err) {
			Toast.error((err?.response?.data?.message) || 'Failed to Signup, Please check your details once');
		}
	};

	return {
		signupLoading,
		signupAuthentication,
	};
};

export default useSignupAuthentication;
