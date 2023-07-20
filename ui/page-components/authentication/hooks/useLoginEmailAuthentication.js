import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const useLoginEmailAuthentication = ({ setMode = () => { } }) => {
	const { query = '' } = useRouter();

	const { t } = useTranslation(['common']);

	const [{ loading: loginLoading }, trigger] = useRequest(
		{
			url    : 'login_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onSubmit = async (values, e) => {
		e.preventDefault();
		try {
			const response = await trigger({
				data: {
					...values,
					auth_scope : 'organization',
					platform   : 'app',
				},
			});

			const { token } = response.data || {};

			let redirectPath;

			if (query.redirectPath) {
				redirectPath = `${query.redirectPath}`;
			}

			setMode('loading_prompts');

			setCookieAndRedirect(token, {}, redirectPath);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || t('common:loginField_error'),

			);
		}
	};

	return { onSubmit, loginLoading };
};

export default useLoginEmailAuthentication;
