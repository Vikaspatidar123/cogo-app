import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCheckDuplicateOrganization = () => {
	const {
		profile,
	} = useSelector((state) => state);

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
			Toast.error('Registraion Number is Invalid');
		}
	};

	return {
		onClickCheckDuplicateOrganization,
		checkDuplicateOrganizationLoading,
	};
};

export default useCheckDuplicateOrganization;
