import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSaasEmailVerification = () => {
	const [{ loading: resendEmailAPILoading }, resendEmailAPItrigger] = useRequest({
		url    : 'resend_lead_verification_email',
		method : 'post',
	}, { manual: true });

	const onClickResendEmail = async (id) => {
		try {
			const payload = {
				lead_user_id : id,
				platform     : 'app',
			};

			const response = await resendEmailAPItrigger({
				data: payload,
			});

			if (response?.hasError) return;

			Toast.success('Verification Email resent successfully');
		} catch (error) {
			Toast.error(error?.error);
		}
	};

	return {
		onClickResendEmail,
		resendEmailAPILoading,
	};
};

export default useSaasEmailVerification;
