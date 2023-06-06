import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request/index';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useSignupOtpAuthentication = ({ otpValue = '', setMode = () => { }, userDetails = {} }) => {
	const [{ loading: signupLoading }, verifyOtpTrigger] = useRequest({
		url    : '/verify_test_lead_user',
		method : 'post',
	}, { manual: true });

	const [{ loading: resendLoading }, resendOtpTrigger] = useRequest({
		url    : '/resend_lead_verification_otp',
		method : 'post',
	}, { manual: true });

	const onSignupWithOtp = async () => {
		try {
			const payload = {
				id  : userDetails?.id,
				otp : otpValue,
			};

			const response = await verifyOtpTrigger({
				data: payload,
			});

			Toast?.success('Verification Successful!');

			setMode('loading_prompts');

			const redirectUrl = '/v2/dashboard';

			const { user_session } = response || {};

			const { token } = user_session || {};

			setCookieAndRedirect(token, {}, redirectUrl);
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	const resendOtp = async ({ timer = {} }) => {
		try {
			const payload = {
				lead_user_id: userDetails?.id,
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
