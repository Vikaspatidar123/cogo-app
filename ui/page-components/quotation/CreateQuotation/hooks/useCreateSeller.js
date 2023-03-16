import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateSeller = () => {
	const { id: userId, branch } = useSelector((state) => state.profile);

	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'create_organization_billing_address',
		},
		{ manual: true },
	);

	const createSellerAddres = async (payload) => {
		const { poc_name, mobile_number, gst_proof, sez_proof, email, ...rest } = payload || {};
		try {
			const resp = await trigger({
				data: {
					...rest,
					organization_id         : branch.id,
					tax_number_document_url : gst_proof?.finalUrl || undefined,
					sez_proof               : sez_proof?.finalUrl || undefined,
					poc_details             : [
						{
							name                : poc_name,
							mobile_number       : mobile_number.number,
							email,
							mobile_country_code : mobile_number.country_code,
						},
					],
					performed_by_id   : userId,
					performed_by_type : 'user',
				},
			});
			Toast.success('Successfully Created Organisation Billing Address');
			return resp;
		} catch (error) {
			Toast.error(
				error?.error?.gst_number?.[0]?.toUpperCase()
          || error?.error?.pincode?.[0]?.toUpperCase(),
			);
			return null;
		}
	};

	return {
		createSellerAddres,
		loading,
	};
};

export default useCreateSeller;
