import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';

const useCheckDuplicateOrganization = () => {
	const { t } = useTranslation(['common', 'getStarted']);
	const [{ loading: checkDuplicateOrganizationLoading }, checkDuplicateOrganizationtrigger] = useRequest({
		url    : 'organization/check_duplicate_organization',
		method : 'post',
	}, { manual: true });

	const onClickCheckDuplicateOrganization = async (formValues) => {
		try {
			const payload = {
				account_type        : 'importer_exporter',
				country_id          : formValues?.country_id,
				registration_number : formValues?.registration_number,
			};

			const response = await checkDuplicateOrganizationtrigger({
				data: payload,
			});

			if (response?.hasError) return;
		} catch (error) {
			Toast.error(t('getStarted:rightPanel_get_started_organization_registration_number_invalid'));
		}
	};

	return {
		onClickCheckDuplicateOrganization,
		checkDuplicateOrganizationLoading,
	};
};

export default useCheckDuplicateOrganization;
