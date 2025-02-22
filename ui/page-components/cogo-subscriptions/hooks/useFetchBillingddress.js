import { Toast } from '@cogoport/components';
import { useCallback, useMemo } from 'react';

import { useRequest } from '@/packages/request';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 100;

const useFetchBillingAddress = ({ profile, setAddressWithoutGst }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'get',
	}, { manual: true });

	const [{ loading: load }, addresApiTrigger] = useRequest({
		url    : '/list_organization_addresses',
		method : 'get',
	}, { manual: true });

	const params = useMemo(() => ({
		filters    : { organization_id: profile?.organization?.id, trade_party_type: 'self' },
		page_limit : DEFAULT_PAGE_LIMIT,
		page       : DEFAULT_PAGE,
	}), [profile?.organization.id]);

	const billingAddress = useCallback(async ({ setAddresses }) => {
		try {
			const resp = await trigger({
				params,
			});
			setAddresses(resp?.data?.list);
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [params, trigger]);

	const addressApi = useCallback(async () => {
		try {
			const resp = await addresApiTrigger({
				params,
			});
			setAddressWithoutGst(resp?.data?.list);
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [addresApiTrigger, params, setAddressWithoutGst]);

	return { billingAddress, loading: loading || load, addressApi };
};
export default useFetchBillingAddress;
