import { Toast } from '@cogoport/components';
import { useState } from 'react';

import useGetAddresses from './useGetAddresses';

import { useRequest } from '@/packages/request';

const useCreateBillingAddres = ({ checked, addressType }) => {
	const { refetch = () => {} } = useGetAddresses();
	const [response, setResp] = useState();

	const [{ loading }, apiCreateAddres] = useRequest({
		url    : 'create_organization_billing_address',
		method : 'post',
	}, { manual: true });
	const [{ loading:apiLoading }, apiCreateBillingAddres] = useRequest({
		url    : 'create_organization_address',
		method : 'post',
	}, { manual: true });

	const api = checked ? apiCreateAddres : apiCreateBillingAddres;
	const createSellerAddres = async (data = {}, handleCloseModal = () => {}) => {
		const { poc_name = '', phoneNumber = '', ...rest } = data || {};
		const { number = '', country_code = '' } = phoneNumber || {};
		try {
			const resp = api({
				data: {
					...rest,
					poc_details:
						poc_name || number || country_code
							? [
								{
									name          : poc_name,
									mobile_number : number,
									mobile_code   : country_code,
								},
							]
							: [],
					address_type: checked ? '' : addressType,
				},
			});
			setResp(resp);
			refetch();
			Toast.success('Successfully Added Address', {
				autoClose : 5000,
				style     : { background: '#f2fff1' },
			});
			handleCloseModal();
			return resp;
		} catch (error) {
			Toast.error(
				error?.error?.gst_number?.[0]?.toUpperCase()
					|| error?.error?.pincode?.[0]?.toUpperCase(),
				{
					autoClose : 7000,
					style     : { backgroundColor: 'white' },
				},
			);
			return null;
		}
	};
	return {
		createSellerAddres,
		createAddressLoading: loading,
		response,
		apiLoading,
	};
};
export default useCreateBillingAddres;
