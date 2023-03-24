// import showErrorsInToast from '@cogo/utils/showErrorsInToastV2';
import { Toast } from '@cogoport/components';

import { APP_EVENT } from '../utils/constant';
import trackEvent from '../utils/trackEvent';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request/index';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useOtpVerification = ({ formData = {}, otpValue = '', userDetails }) => {
	const { query } = useRouter();
	const { id } = userDetails || {};
	const [{ loading: verifyLeadUserMobileApiLoading }, verifyLeadUserMobileApitrigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });

	const [{ loading: resendLeadVerificationOtpApiLoading }, resendLeadVerificationOtpApitrigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });
	const { lead_organization_id, source } = query;

	const onClickVerifyLeadUserMobileNo = async () => {
		try {
			const payload = {
				id,
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

			const redirectUrl = `/v2/get-started?saastheme&lead_organization_id=${lead_organization_id}&source=${
				source || 'subscriptions'
			}`;

			const { user_session } = userDetails || {};
			const { token } = user_session || {};
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
