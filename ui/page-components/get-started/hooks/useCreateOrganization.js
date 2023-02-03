import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateOrganization = (setBillingAddressDetails) => {
	const {
		profile,
	} = useSelector((state) => state);

	const [{ loading: createOrganizationLoading }, createOrganizationtrigger] = useRequest({
		url    : 'create_organization',
		method : 'post',
	}, { manual: true });

	const onClickCreateOrganization = async (val) => {
		try {
			const payload = {
				account_type        : 'importer_exporter',
				country_id          : val?.country_id,
				registration_number : val?.registration_number,
				user_id             : profile?.id,
				business_name       : val?.business_name,
				preferred_languages : val?.preferred_languages,
				work_scopes         : val?.work_scopes,
			};

			const response = await createOrganizationtrigger({
				data: payload,
			});

			if (response?.hasError) return;
			if (response?.status === 200) setBillingAddressDetails(true);

			Toast.success('Organization created successfully');
		} catch (error) {
			Toast.error(error?.error);
		}
	};

	return {
		onClickCreateOrganization,
		createOrganizationLoading,
	};
};

export default useCreateOrganization;
