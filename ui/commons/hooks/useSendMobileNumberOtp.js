import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
// import showErrorsInToast from '@/utils/showErrorsInToast';

const useSendMobileNumberOtp = () => {
	const [{ loading }, sendOtpApi] = useRequest({
		url    : '/send_login_otp',
		method : 'post',
	}, { manual: true });
	const [{ loading:load }, resendOtpApi] = useRequest({
		url    : '/resend_lead_verification_otp',
		method : 'post',
	}, { manual: true });
	const onSuccess = ({ action = '', callback = () => { }, response = {} }) => {
		if (action === 'send') {
			Toast.success('OTP sent successfully.');
		} else {
			Toast.success('OTP resent successfully');
		}

		callback(response);
	};

	const onFailure = ({ error = {}, callback = () => { } }) => {
		callback({
			error,
			showError: () => {
				Toast(error.data);
			},
		});
	};
	const sendOtp = async ({
		action = 'send',
		payload = {},
		onSuccessCallback = () => { },
		onFailureCallback = () => { },
	}) => {
		try {
			const api = action === 'send' ? sendOtpApi : resendOtpApi;

			const response = await api({
				data: payload,
			});

			onSuccess({
				action,
				callback : onSuccessCallback,
				response : response.data,
			});
		} catch (error) {
			onFailure({ error, callback: onFailureCallback });
		}
	};

	return {
		loading: loading || load,
		sendOtp,
	};
};

export default useSendMobileNumberOtp;
