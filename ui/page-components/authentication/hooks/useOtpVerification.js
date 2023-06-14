// import showErrorsInToast from '@cogo/utils/showErrorsInToastV2';
import { Toast } from '@cogoport/components';

import { APP_EVENT } from '../utils/constant';
import trackEvent from '../utils/trackEvent';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request/index';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useOtpVerification = ({ formData = {}, otpValue = '', userDetails }) => {
	const { query } = useRouter();
	const [{ loading: verifyLeadUserMobileApiLoading }, verifyLeadUserMobileApitrigger] = useRequest({
		url    : '/lead/verify_lead_user_mobile',
		method : 'post',
	}, { manual: true });

	const [{ loading: resendLeadVerificationOtpApiLoading }, resendLeadVerificationOtpApitrigger] = useRequest({
		url    : '/lead/resend_lead_verification_otp',
		method : 'post',
	}, { manual: true });

	const onClickVerifyLeadUserMobileNo = async () => {
		try {
			const payload = {
				id                  : userDetails?.id,
				mobile_number       : formData?.mobile_number.number,
				mobile_country_code : formData?.mobile_number.country_code,
				mobile_otp          : otpValue,
			};

			trackEvent(APP_EVENT.auth_confirmed_otp_for_mobile_verification, {
				mobile_country_code : payload?.mobile_country_code,
				mobile_number       : payload?.mobile_number,
			});

			const response = await verifyLeadUserMobileApitrigger({
				data: payload,
			});

			Toast?.success('Verification Successful!');
			let redirectUrl = null;
			if (query?.redirectPath) {
				redirectUrl = query?.redirectPath;
			} else if (query?.redirectAfterSwitch) {
				redirectUrl = `/redirect?url=${query?.redirectAfterSwitch}`;
			}

			const { token } = response?.data || {};
			setCookieAndRedirect(token, {}, redirectUrl);
			if (response) {
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
		loading          : verifyLeadUserMobileApiLoading,
		onClickVerifyLeadUserMobileNo,
		resendOtpLoading : resendLeadVerificationOtpApiLoading,
		resendOtp,
	};
};

export default useOtpVerification;
