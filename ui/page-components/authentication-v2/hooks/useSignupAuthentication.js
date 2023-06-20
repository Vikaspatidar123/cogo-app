import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const getFormattedPayload = ({ val, captchaResponse, leadUserId }) => {
	const { name, email, mobile_number, is_whatsapp_number, business_name, country_id } = val;

	return {
		lead_user_id              : leadUserId || undefined,
		name,
		email,
		mobile_country_code       : mobile_number.country_code,
		mobile_number             : mobile_number.number,
		is_whatsapp_number,
		business_name,
		country_id,
		google_recaptcha_response : captchaResponse,
	};
};

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
			const payload = getFormattedPayload({ val, captchaResponse, leadUserId });

			const res = await trigger({
				data: payload,
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
