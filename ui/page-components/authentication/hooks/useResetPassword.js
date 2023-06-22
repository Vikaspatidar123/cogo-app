import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useResetPassword = () => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { id: emailToken = '' } = query;

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'reset_user_password',
			method : 'post',
		},
		{ manual: true },
	);

	const onResetPassword = async (values) => {
		console.log(values);
		try {
			const payload = {
				password : values?.password,
				token    : emailToken,
			};

			const response = await trigger({
				data: payload,
			});

			window.alert(response);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Failed to Login, Please try again',
			);
		}
	};

	return { onResetPassword, loading };
};

export default useResetPassword;
