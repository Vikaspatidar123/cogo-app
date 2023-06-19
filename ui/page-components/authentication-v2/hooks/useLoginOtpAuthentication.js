import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const getFormattedPayload = ({ mobileNumber, otpId, otpValue }) => ({
	id                  : otpId,
	mobile_otp          : otpValue,
	mobile_number       : mobileNumber?.number,
	mobile_country_code : mobileNumber?.country_code,
	auth_scope          : 'organization',
	platform            : 'app',
});

const useLoginOtpAuthentication = (props) => {
	const { mobileNumber = {}, otpId = '', otpValue = '', setMode = () => {} } = props;

	const { query = '' } = useRouter();

	const [{ loading: loginLoading }, trigger] = useRequest(
		{
			url    : 'login_user_with_mobile',
			method : 'post',
		},
		{ manual: true },
	);

	const onLoginWithOtp = async () => {
		try {
			const payload = getFormattedPayload({ mobileNumber, otpId, otpValue });

			const response = await trigger({
				data: {
					...payload,
				},
			});

			const { token } = response.data || {};

			let redirectPath;

			if (query.redirectPath) {
				redirectPath = `${query.redirectPath}`;
			}

			setMode('loading_prompts');

			setCookieAndRedirect(token, {}, redirectPath);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Failed to Login, Please try again',
			);
		}
	};

	return { onLoginWithOtp, loginLoading };
};

export default useLoginOtpAuthentication;
