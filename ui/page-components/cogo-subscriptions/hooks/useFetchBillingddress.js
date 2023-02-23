/* eslint-disable no-empty-pattern */
import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useFetchBillingAddress = ({ profile }) => {
	const [{}, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'get',
	}, { manual: true });

	const billingAddress = async ({ setAddresses }) => {
		try {
			const resp = await trigger({
				params: {
					organization_id : profile?.organization.id,
					page_limit      : 100,
					page            : 1,
				},
			});
			setAddresses(resp?.data?.list);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { billingAddress };
};
export default useFetchBillingAddress;
