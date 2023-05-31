import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSignupAuthentication = ({
	setMode, setUserDetails, captchaResponse, hasWhatsApp,
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
		console.log('payload:: ', payload);
		try {
			// const res = await trigger({
			// 	data: {
			// 		...payload,
			// 	},
			// });

			// if (res?.status === 200) {
			// 	const { data } = res || {};
			// 	setshowOtpForm(true);
			// 	const userDetails = {
			// 		...payload,
			// 		...data,
			// 		...userInfo,
			// 	};

			// 	setUserDetails(userDetails);
			// }
			setMode('otp_form');
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
