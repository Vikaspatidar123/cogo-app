import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';

const useUpdateUser = (refetch) => {
	const { t } = useTranslation(['settings']);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_user',
		method : 'post',
	}, { manual: true });

	const getUpdate = async (preferred_languages) => {
		try {
			const resp = await trigger({
				data: {
					preferred_languages,
				},
			});
			if (resp.status === 200) {
				refetch();
				Toast.success(t('settings:successfully_updated_langauges_toast'));
			}
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return { getUpdate, loading };
};

export default useUpdateUser;
