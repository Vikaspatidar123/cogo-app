import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request/index';

const useLoginMobileAuthentication = ({
	setMode = () => {},
	setMobileNumber = () => {},
	setOtpId = () => {},
	mobileNumber = {},
}) => {
	const [{ loading: otpLoading }, trigger] = useRequest(
		{
			url    : 'send_login_otp',
			method : 'post',
		},
		{ manual: true },
	);

	const onSendOtp = async (values, e) => {
		e.preventDefault();
		try {
			const response = await trigger({
				data: {
					mobile_number       : values?.mobile_number?.number,
					mobile_country_code : values?.mobile_number?.country_code,
				},
			});

			setOtpId(response?.data?.id);

			setMobileNumber(values?.mobile_number);

			setMode('otp_form');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Failed to send OTP, Please try again',
			);
		}
	};

	const resendOtp = async ({ timer = {} }) => {
		try {
			const response = await trigger({
				data: {
					mobile_number       : mobileNumber?.number,
					mobile_country_code : mobileNumber?.country_code,
				},
			});

			setOtpId(response?.data?.id);

			Toast.success('OTP resent successfully');

			timer?.restart?.();
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Failed to resend OTP, Please try again.',
			);
		}
	};

	return { onSendOtp, otpLoading, resendOtp };
};

export default useLoginMobileAuthentication;
