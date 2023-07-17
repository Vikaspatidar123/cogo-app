import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';

const useResetUserPassword = ({ setMode = () => { }, setEmailId = () => { } }) => {
	const { t } = useTranslation(['authentication']);
	const [{ loading: resetPasswordLoading }, trigger] = useRequest({
		url    : 'reset_user_password',
		method : 'post',
	}, { manual: true });

	const resetUserPassword = async (val) => {
		try {
			await trigger({
				data: {
					email      : val.email,
					auth_scope : 'organization',
				},
			});

			Toast.success(t('authentication:forgotPassword_success_message'));

			setMode('success');

			setEmailId(val.email);
		} catch (err) {
			Toast.error(err?.response?.data || t('authentication:forgotPassword_error_message'));
		}
	};

	return {
		resetPasswordLoading,
		resetUserPassword,
	};
};

export default useResetUserPassword;
