import { toast } from '@cogoport/components';

import useRequest from '@/packages/request';
// import showErrorsInToast from '@/utils/showErrorsInToast';

const useSendMobileNumberOtp = () => {
	const sendOtpApi = useRequest('post', false, 'partner')('/send_login_otp');

	const resendOtpApi = useRequest(
		'post',
		false,
		'partner',
	)('/resend_lead_verification_otp');

	const onSuccess = ({ action = '', callback = () => {}, response = {} }) => {
		if (action === 'send') {
			toast.success('OTP sent successfully.');
		} else {
			toast.success('OTP resent successfully');
		}

		callback(response);
	};

	const onFailure = ({ error = {}, callback = () => {} }) => {
		callback({
			error,
			showError: () => {
				showErrorsInToast(error.data);
			},
		});
	};
	const sendOtp = async ({
		action = 'send',
		payload = {},
		onSuccessCallback = () => {},
		onFailureCallback = () => {},
	}) => {
		try {
			const api = action === 'send' ? sendOtpApi : resendOtpApi;

			const response = await api.trigger({
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
		loading: sendOtpApi.loading || resendOtpApi.loading,
		sendOtp,
	};
};

export default useSendMobileNumberOtp;
