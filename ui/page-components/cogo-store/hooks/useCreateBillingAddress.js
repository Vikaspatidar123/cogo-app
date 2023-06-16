import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateBillingAddress = ({
	setShowAddressModal = () => { },
	reset = () => { },
	billingAddress = () => { },
}) => {
	const { profile } = useSelector((state) => state);
	const orgId = profile?.partner?.twin_importer_exporter_id;

	const [{ loading }, trigger] = useRequest({
		url: '/create_organization_billing_address',
		method: 'post',
	}, { manual: true });

	const createBillingAddress = async (val) => {
		const {
			address = '',
			billingPartyName = '',
			taxNumber = '',
			name = '',
			mobileNumber,
			email = '',
			pincode = '',
			city = '',
			country = '',
			state = '',
			address_type = '',
		} = val || {};
		const { number = '', country_code = '' } = mobileNumber || {};

		try {
			await trigger({
				data: {
					organization_id: orgId,
					source: 'app',
					tax_number: taxNumber,
					name: billingPartyName,
					poc_details: [
						{
							name,
							mobile_number: number,
							email,
							mobile_country_code: country_code,
						},
					],
					address,
					city,
					country_id: country,
					state_id: state,
					pincode,
					address_type,
				},
			});
			billingAddress();
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		} finally {
			reset();
			setShowAddressModal(false);
		}
	};

	return {
		createBillingAddress,
		loading,
	};
};
export default useCreateBillingAddress;
