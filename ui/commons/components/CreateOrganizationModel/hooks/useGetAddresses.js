import { useEffect, useCallback, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useBillingAddress = () => {
	const { profile = {} } = useSelector((state) => state);
	const [addressesList, setAddressesList] = useState();
	const { organization } = profile || {};
	const { id: org_id } = organization;

	const [{ loading }, trigger] = useRequest(
		{
			url        : '/list_organizations',
			method     : 'get',
			autoCancel : true,
		},
		{ manual: true },
	);

	const getAddress = useCallback(async () => {
		const resp = await trigger({
			params: {
				filters                    : { id: org_id },
				billing_addresses_required : true,
				addresses_required         : true,
			},
		});
		if (resp?.data) {
			const { list = {} } = resp?.data || {};
			const { addresses = [], billing_addresses = [] } = list?.[0] || {};
			setAddressesList([...addresses, ...billing_addresses]);
		}
	}, [org_id, trigger]);

	useEffect(() => {
		getAddress();
	}, [getAddress]);

	return {
		addressLoading : loading,
		addressList    : addressesList,
		refetch        : getAddress,
	};
};
export default useBillingAddress;
