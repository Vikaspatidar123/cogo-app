import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request/index';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useSignupOtpAuthentication = ({ otpValue = '', setMode = () => {}, userDetails = {} }) => {
	const [{ loading: signupLoading }, verifyOtpTrigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });

	const [{ loading: resendLoading }, resendOtpTrigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });

	const onSignupWithOtp = async () => {
		try {
			const payload = {
				mobile_number       : userDetails?.mobile_number?.number,
				mobile_country_code : userDetails?.mobile_number?.country_code,
				mobile_otp          : otpValue,
			};

			const response = await verifyOtpTrigger({
				data: payload,
			});

			Toast?.success('Verification Successful!');

			const redirectUrl = '/v2/dashboard';

			const { user_session } = userDetails || {};
			const { token } = user_session || {};

			if (response) {
				setMode('loading_prompts');
				setCookieAndRedirect(token, {}, redirectUrl);
			}
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	const resendOtp = async ({ timer = {} }) => {
		try {
			const payload = {
				mobile_number       : userDetails?.mobile_number,
				mobile_country_code : userDetails?.mobile_country_code,
			};

			await resendOtpTrigger({
				data: payload,
			});

			Toast.success('OTP Resent Successfully');

			timer?.restart?.();
		} catch (error) {
			Toast.error([error?.error?.message]);
		}
	};

	return {
		signupLoading,
		onSignupWithOtp,
		resendLoading,
		resendOtp,
	};
};

export default useSignupOtpAuthentication;
