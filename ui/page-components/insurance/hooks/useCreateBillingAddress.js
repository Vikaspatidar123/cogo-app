import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useCreateBillingAddres = ({ checked, addressType }) => {
	const [response, setResp] = useState();

	const apiCreateAddres = useRequest(
		{
			method : 'post',
			url    : 'create_organization_billing_address',
		},
		{
			manual: true,
		},
	);

	const apiCreateBillingAddres = useRequest(
		{
			method : 'post',
			url    : 'create_organization_address',
		},
		{
			manual: true,
		},
	);

	const api = checked ? apiCreateAddres[1] : apiCreateBillingAddres[1];

	const createSellerAddres = async (data, handleCloseModal) => {
		const { poc_name, email, phoneNumber, ...rest } = data || {};
		const { number, country_code } = phoneNumber || {};
		try {
			const resp = await api({
				data: {
					...rest,
					poc_details: poc_name || number || country_code ? [{
						name          : poc_name,
						mobile_number : number,
						mobile_code   : country_code,
					}] : [],
					address_type: checked ? '' : addressType,
				},
			});
			setResp(resp);
			Toast.success('Successfully Added Address', {
				autoClose : 5000,
				style     : { background: '#f2fff1' },
			});
			handleCloseModal();
			return resp;
		} catch (error) {
			Toast.error(error);
			return null;
		}
	};

	return {
		createSellerAddres,
		createAddressLoading: api?.[0]?.loading,
		response,
	};
};
export default useCreateBillingAddres;
