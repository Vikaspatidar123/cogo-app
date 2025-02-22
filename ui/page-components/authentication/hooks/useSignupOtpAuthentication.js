import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useSignupOtpAuthentication = ({ otpValue = '', setMode = () => { }, userDetails = {} }) => {
	const { t } = useTranslation(['authentication']);
	const [{ loading: signupLoading }, verifyOtpTrigger] = useRequest({
		url    : 'verify_sign_up_lead_user',
		method : 'post',
	}, { manual: true });

	const [{ loading: resendLoading }, resendOtpTrigger] = useRequest({
		url    : 'resend_lead_verification_otp',
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

			Toast?.success(t('authentication:signupOtp_verifyOtp_success'));
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

			Toast.success(t('authentication:signupOtp_resendOtp_success'));

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
