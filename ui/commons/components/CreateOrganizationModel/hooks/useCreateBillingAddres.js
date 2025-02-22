import { Toast } from '@cogoport/components';
import { useState } from 'react';

import useGetAddresses from './useGetAddresses';

import { useRequest } from '@/packages/request';

const useCreateBillingAddres = ({ checked, addressType, refetch:refetchAddres = () => {} }) => {
	const { refetch = () => {} } = useGetAddresses();
	const [response, setResp] = useState();

	const [{ loading }, apiCreateAddres] = useRequest({
		url    : '/create_organization_billing_address',
		method : 'post',
	}, { manual: true });
	const [{ loading:apiLoading }, apiCreateBillingAddres] = useRequest({
		url    : '/create_organization_address',
		method : 'post',
	}, { manual: true });

	const api = checked ? apiCreateAddres : apiCreateBillingAddres;

	const createSellerAddres = async (data = {}, handleCloseModal = () => {}) => {
		const { poc_name = '', phoneNumber = '', ...rest } = data || {};
		const { number = '', country_code = '' } = phoneNumber || {};
		try {
			const resp = await api({
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
			if (resp) {
				refetch();
				handleCloseModal();
				refetchAddres();
			}
			Toast.success('Successfully Added Address');
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
		createAddressLoading: loading,
		response,
		apiLoading,
	};
};
export default useCreateBillingAddres;
