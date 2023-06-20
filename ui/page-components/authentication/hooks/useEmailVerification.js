import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useEmailVerification = () => {
	const [{ loading: resendEmailAPILoading }, resendEmailAPItrigger] = useRequest({
		url    : 'resend_lead_verification_email',
		method : 'post',
	}, { manual: true });

	const onClickResendEmail = async (id) => {
		try {
			const payload = {
				lead_user_id : id || undefined,
				platform     : 'app',
			};

			await resendEmailAPItrigger({
				data: payload,
			});

			Toast.success('Verification Email has been Resent.');
		} catch (error) {
			Toast.error(error?.error);
		}
	};

	return {
		onClickResendEmail,
		resendEmailAPILoading,
	};
};

export default useEmailVerification;
