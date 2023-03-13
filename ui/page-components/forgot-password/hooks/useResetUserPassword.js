import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useResetUserPassword = (setSentMail, setEmailId) => {
	const [{ loading: resetPasswordLoading }, trigger] = useRequest({
		url    : 'reset_user_password',
		method : 'post',
	}, { manual: true });

	const resetUserPassword = async (val) => {
		try {
			const res = await trigger({
				data: {
					email      : val.email || val,
					auth_scope : 'organization',
				},
			});

			if (res.status === 200 && val.email === undefined) {
				Toast.success('A link has been sent to your email address ');
			}

			if (res.status === 200 && val.email) {
				setSentMail(true);
				setEmailId(val.email);
			}
		} catch (e) {
			Toast.error('Something went wrong');
		}
	};

	return {
		resetPasswordLoading,
		resetUserPassword,
	};
};

export default useResetUserPassword;
