import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useFetchBillingAddress = ({ profile, setAddressWithoutGst }) => {
	const [{ laoding }, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'get',
	}, { manual: true });
	const [{ laoding:load }, addresApi] = useRequest({
		url    : '/list_organization_addresses',
		method : 'get',
	}, { manual: true });
	const params = {
		organization_id : profile?.organization.id,
		page_limit      : 100,
		page            : 1,
	};
	const billingAddress = useCallback(async ({ setAddresses }) => {
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
	}, [profile?.organization.id, trigger]);
	const addressApi = async () => {
		try {
			const resp = await addresApi({
				params,
			});
			setAddressWithoutGst(resp?.data?.list);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { billingAddress, laoding, addressApi, load };
};
export default useFetchBillingAddress;
