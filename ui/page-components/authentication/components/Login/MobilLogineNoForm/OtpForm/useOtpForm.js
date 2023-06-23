import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import { APP_EVENT, trackEvent } from '@/ui/commons/constants/analytics';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useOtpForm = ({ userDetails = {}, otpValue = '' }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const [{ loading }, loginUserWithMobileApi] = useRequest({
		url    : '/login_user_with_mobile',
		method : 'post',
	}, { manual: true });

	const [{ loading: sendOtpLoading }, sendLoginOtpApi] = useRequest({
		url    : '/send_login_otp',
		method : 'post',
	}, { manual: true });

	const onClickLoginUserWithMobileNo = async () => {
		try {
			const payload = {
				id                  : userDetails?.userId,
				mobile_otp          : otpValue,
				mobile_number       : userDetails?.contactNo?.number,
				mobile_country_code : userDetails?.contactNo?.country_code,
				auth_scope          : 'organization',
				platform            : 'app',
			};

			trackEvent(APP_EVENT.auth_logged_in_via_mobile, {
				mobile_country_code : payload.mobile_country_code,
				mobile_number       : payload.mobile_number,
			});

			const response = await loginUserWithMobileApi({
				data: payload,
			});

			Toast.success('Verification Successful!');

			let redirectUrl = null;
			if (query?.redirectPath) {
				redirectUrl = query?.redirectPath;
			} else if (query?.redirectAfterSwitch) {
				redirectUrl = `/redirect?url=${query?.redirectAfterSwitch}`;
			}

			const { token } = response?.data || {};
			setCookieAndRedirect(token, {}, redirectUrl);
		} catch (error) {
			showErrorsInToast(error?.response?.data);
		}
	};

	const sendOtp = async ({ timer = {} }) => {
		try {
			const payload = {
				mobile_number       : userDetails?.contactNo?.number,
				mobile_country_code : userDetails?.contactNo?.country_code,
			};

			const response = await sendLoginOtpApi({
				data: payload,
			});

			if (response?.hasError) return;

			Toast.success('OTP resent successfully');

			timer?.restart?.();
		} catch (error) {
			showErrorsInToast(error?.response?.data);
		}
	};

	return {
		loading,
		onClickLoginUserWithMobileNo,
		sendOtpLoading,
		sendOtp,
	};
};

export default useOtpForm;
