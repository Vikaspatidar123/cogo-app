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
			const response = await verifyOtpTrigger({
				data: {
					id  : userDetails?.id,
					otp : otpValue,
				},
			});

			const redirectUrl = '/dashboard';

			const { token } = response.data || {};

			setMode('loading_prompts');

			setCookieAndRedirect(token, {}, redirectUrl);

			Toast?.success('Verification Successful!');
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
