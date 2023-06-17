import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetBillingAddress = ({ setSelectAddressId = () => { } }) => {
	const { profile } = useSelector((state) => state);
	const orgId = profile?.organization?.id;

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'get',
	}, { manual: true });

	const billingAddress = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					organization_id : orgId,
					page_limit      : 100,
					page            : 1,
				},
			});

			const { list } = res?.data || {};
			if (list?.[0]?.id) {
				setSelectAddressId(list?.[0].id);
			}
		} catch (error) {
			console.log(error);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger, orgId]);

	useEffect(() => {
		billingAddress();
	}, [billingAddress]);

	return { billingAddress, loading, data };
};
export default useGetBillingAddress;
