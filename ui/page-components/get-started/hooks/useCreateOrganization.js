import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useCreateOrganization = ({ setBillingAddressDetails, setOrgId, setOrgBranchId, lead_organization_id }) => {
	const {
		profile,
	} = useSelector((state) => state);
	const apiName = lead_organization_id
		? 'saas_tools/convert_saas_lead_organization'
		: 'create_organization';
	const [{ loading: createOrganizationLoading }, createOrganizationtrigger] = useRequest({
		url    : apiName,
		method : 'post',
	}, { manual: true });

	const onClickCreateOrganization = async (val) => {
		try {
			const payload = {
				account_type         : 'importer_exporter',
				country_id           : val?.country_id,
				registration_number  : val?.registration_number,
				user_id              : profile?.id,
				business_name        : val?.business_name,
				preferred_languages  : val?.preferred_languages,
				work_scopes          : val?.work_scopes,
				lead_organization_id : lead_organization_id || undefined,
			};

			const response = await createOrganizationtrigger({
				data: payload,
			});
			if (response?.hasError) return;
			if (response?.status === 200) {
				setBillingAddressDetails(true);
				setOrgId(response?.data?.id);
				setOrgBranchId(response?.data?.organization_branch_id);
			}

			Toast.success('Organization created successfully');
		} catch (error) {
			showErrorsInToast(error?.response?.data);
		}
	};

	return {
		onClickCreateOrganization,
		createOrganizationLoading,
	};
};

export default useCreateOrganization;
