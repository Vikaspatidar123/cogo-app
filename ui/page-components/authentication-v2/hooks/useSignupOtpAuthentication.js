import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request/index';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useSignupOtpAuthentication = ({ mobileNumber = {}, otpValue = '', setMode = () => {} }) => {
	const { query } = useRouter();
	const [{ loading: verifyLeadUserMobileApiLoading }, verifyLeadUserMobileApitrigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });

	const [{ loading: resendLeadVerificationOtpApiLoading }, resendLeadVerificationOtpApitrigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: true });
	const { lead_organization_id, source } = query;

	const onSignupWithOtp = async () => {
		try {
			setMode('loading_prompts');
			// const payload = {
			// 	mobile_number       : mobileNumber?.number,
			// 	mobile_country_code : mobileNumber?.country_code,
			// 	mobile_otp          : otpValue,
			// };

			// const response = await verifyLeadUserMobileApitrigger({
			// 	data: payload,
			// });

			// Toast?.success('Verification Successful!');

			// const redirectUrl = `/v2/get-started?saastheme&lead_organization_id=${lead_organization_id}&source=${
			// 	source || 'subscriptions'
			// }`;

			// const { user_session } = userDetails || {};
			// const { token } = user_session || {};
			// if (response) {
			// 	setCookieAndRedirect(token, {}, redirectUrl);
			// 	setMode('loading_prompts');
			// }
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
		onSignupWithOtp,
		resendOtpLoading : resendLeadVerificationOtpApiLoading,
		resendOtp,
	};
};

export default useSignupOtpAuthentication;
