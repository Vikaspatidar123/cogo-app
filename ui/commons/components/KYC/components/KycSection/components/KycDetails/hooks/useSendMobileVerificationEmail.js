import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useSendMobileVerificationEmail = ({ user_id = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_mobile_verification_email',
		method : 'post',
	}, { manual: true });

	const sendVerificationLink = async () => {
		try {
			await trigger({
				data: {
					user_id,
				},
			});

			Toast.success('Mobile Verification Link Sent Successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};

	return {
		sendVerificationLink,
		loading,
	};
};

export default useSendMobileVerificationEmail;
