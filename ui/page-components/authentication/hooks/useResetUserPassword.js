import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useResetUserPassword = ({ setMode, setEmailId }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/reset_user_password',
		method : 'post',
	}, { manual: true });

	const resetUserPassword = async (val) => {
		try {
			await trigger({
				data: {
					email      : val.email || val,
					auth_scope : 'organization',
				},
			});

			Toast.success('A link has been sent to your email address.');

			setMode('success');

			setEmailId(val.email);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		resetPasswordLoading: loading,
		resetUserPassword,
	};
};

export default useResetUserPassword;
