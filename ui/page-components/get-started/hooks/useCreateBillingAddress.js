import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useCreateBillingAddress = ({ isSez, orgId, setInviteTeam }) => {
	const [{ loading: createBillingAddressLoading }, createBillingAddresstrigger] = useRequest({
		url    : 'organization/create_organization_billing_address',
		method : 'post',
	}, { manual: true });

	const onClickCreateBillingAddress = async (val) => {
		try {
			const payload = {
				address                 : val?.billing_address,
				pincode                 : val?.pincode,
				tax_number              : val?.gst_number,
				poc_details             : [],
				organization_id         : orgId,
				is_sez                  : isSez,
				sez_proof               : val?.sez_proof,
				tax_number_document_url : val?.tax_document_proof,
			};

			const response = await createBillingAddresstrigger({
				data: payload,
			});

			if (response?.hasError) return;
			if (response?.status === 200) {
				setInviteTeam(true);
			}

			Toast.success('Organization Billing Address Added successfully');
		} catch (error) {
			showErrorsInToast(error?.response?.data);
		}
	};

	return {
		onClickCreateBillingAddress,
		createBillingAddressLoading,
	};
};

export default useCreateBillingAddress;
