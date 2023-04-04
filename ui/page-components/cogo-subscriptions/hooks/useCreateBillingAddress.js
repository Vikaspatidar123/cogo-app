import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useCreateBillingAddres = ({ profile }) => {
	const { id, branch } = profile || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_billing_address',
		method : 'post',
	}, { manual: true });

	const createSellerAddres = async (data, handleCloseModal) => {
		const {
			name,
			phoneCode,
			phoneNumber,
			gst_proof = {},
			sez_proof = {},
			email,
			taxNumber,
			billingPartyName,
			...rest
		} = data || {};
		try {
			const resp = await trigger({
				data: {
					...rest,
					organization_id         : branch?.id,
					tax_number_document_url : gst_proof?.url,
					sez_proof               : sez_proof?.url,
					tax_number              : taxNumber,
					name                    : billingPartyName,
					poc_details             : [
						{
							name,
							mobile_number       : phoneNumber,
							email,
							mobile_country_code : phoneCode,
						},
					],
					performed_by_id   : id,
					performed_by_type : 'user',
				},
			});
			Toast.success('Successfully Created Organisation Billing Address', {
				autoClose : 5000,
				style     : { background: '#f2fff1' },
			});
			handleCloseModal();
			return resp;
		} catch (error) {
			Toast.error(
				error?.error?.gst_number?.[0]?.toUpperCase()
					|| error?.error?.pincode?.[0]?.toUpperCase(),
			);
			return null;
		}
	};
	return { createSellerAddres, createAddressLoading: loading };
};
export default useCreateBillingAddres;
