import { toast } from '@cogoport/front/components';

import useRequest from '@/packages/request';
import { useSelector } from '@/packages/store';

const useEmailVerification = ({ userDetails = {} }) => {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const [{ loading: resendEmailAPILoading }, resendEmailAPItrigger] = useRequest({
		url    : '/lead/verify_lead_user_mobile',
		method : 'post',
	}, { manual: true });

	const onClickResendEmail = async () => {
		try {
			const payload = {
				lead_user_id : userDetails?.id,
				platform     : 'app',
			};

			const response = await resendEmailAPItrigger({
				data: payload,
			});

			if (response?.hasError) return;

			toast.success('Verification Email resent successfully');
		} catch (error) {
			toast.error(error?.error);
		}
	};

	return {
		onClickResendEmail,
	};
};

export default useEmailVerification;
