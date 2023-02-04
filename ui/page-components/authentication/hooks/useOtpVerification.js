// import showErrorsInToast from '@cogo/utils/showErrorsInToastV2';
import { Toast } from '@cogoport/components';

import { APP_EVENT } from '../utils/constant';
import setCookieAndRedirect from '../utils/setCookieAndRedirect';
import trackEvent from '../utils/trackEvent';

import { useRequest } from '@/packages/request/index';
import { useSelector } from '@/packages/store';

const useOtpVerification = ({ formData = {}, otpValue = '', id }) => {
	const {
		general: { scope = '', query = {} },
	} = useSelector((state) => state);

	const [{ loading: verifyLeadUserMobileApiLoading }, verifyLeadUserMobileApitrigger] = useRequest({
		url: '/lead/verify_lead_user_mobile',
		method: 'post',
	}, { manual: true });

	const [{ loading: resendLeadVerificationOtpApiLoading }, resendLeadVerificationOtpApitrigger] = useRequest({
		url: '/lead/resend_lead_verification_otp',
		method: 'post',
	}, { manual: true });

	const onClickVerifyLeadUserMobileNo = async () => {
		try {
			const payload = {
				id,
				mobile_number: formData?.mobile_number.number,
				mobile_country_code: formData?.mobile_number.country_code,
				mobile_otp: otpValue,
			};

			trackEvent(APP_EVENT.auth_confirmed_otp_for_mobile_verification, {
				mobile_country_code: payload?.mobile_country_code,
				mobile_number: payload?.mobile_number,
			});

			const response = await verifyLeadUserMobileApitrigger({
				data: payload,
			});

			Toast?.success('Verification Successful!');

			const redirectUrl = '/get-started';

			const { token } = response?.data || {};
			if (token) setCookieAndRedirect(token, {}, redirectUrl);
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	const resendOtp = async ({ timer = {} }) => {
		try {
			const payload = {
				lead_user_id: id,
			};

			await resendLeadVerificationOtpApitrigger({
				data: payload,
			});

			Toast.success('OTP resent successfully');

			timer?.restart?.();
		} catch (error) {
			Toast.error([error?.error?.message]);
		}
	};

	return {
		loading: verifyLeadUserMobileApiLoading,
		onClickVerifyLeadUserMobileNo,
		resendOtpLoading: resendLeadVerificationOtpApiLoading,
		resendOtp,
	};
};

export default useOtpVerification;
