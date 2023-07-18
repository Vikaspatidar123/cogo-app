import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getFormattedPayload = ({ formValues, user_id }) => ({
	...(formValues || {}),
	user_id,
	account_type: 'importer_exporter',
});

const useGetStartedAuthentication = ({ setMode = () => { } }) => {
	const { profile: { id: user_id = '' } } = useSelector((state) => state);

	const { t } = useTranslation(['authentication']);
	const translationKey = 'authentication:getStarted';

	const [{ loading: getStartedLoading }, trigger] = useRequest({
		url    : 'create_organization',
		method : 'post',
	}, { manual: true });

	const onGetStartedApi = async (formValues, e) => {
		e.preventDefault();

		try {
			const payload = getFormattedPayload({ formValues, user_id });

			await trigger({
				data: payload,
			});

			setMode('loading_prompts');

			window.location.href = '/';
		} catch (err) {
			if (isEmpty(err?.response?.data?.email)) {
				Toast.error(t(`${translationKey}_email_error`));
			} else {
				Toast.error(t(`${translationKey}_error`));
			}
		}
	};

	return {
		onGetStartedApi,
		getStartedLoading,
	};
};

export default useGetStartedAuthentication;
