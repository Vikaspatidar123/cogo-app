import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateBillingAddress = ({ isSez, orgId, setInviteTeam }) => {
	const {
		profile,
	} = useSelector((state) => state);

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
				sez_proof               : val?.sez_proof?.finalUrl,
				tax_number_document_url : val?.tax_document_proof?.finalUrl,
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
			Toast.error('Something Went Wrong');
		}
	};

	return {
		onClickCreateBillingAddress,
		createBillingAddressLoading,
	};
};

export default useCreateBillingAddress;
