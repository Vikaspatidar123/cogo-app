import { useEffect, useCallback, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useBillingAddress = () => {
	const { profile = {} } = useSelector((state) => state);
	const [addressesList, setAddressesList] = useState();
	const { partner = {} } = profile || {};
	const { id = '' } = partner || {};

	const [{ loading }, trigger] = useRequest({
		url        : 'list_organizations',
		method     : 'get',
		autoCancel : false,
	}, { manual: true });

	const getAddress = useCallback(async () => {
		const resp = await trigger({
			params: {
				filters                    : { id },
				billing_addresses_required : true,
				addresses_required         : true,
			},
		});
		if (resp?.data) {
			const { list = {} } = resp?.data || {};
			const { addresses = [], billing_addresses = [] } = list?.[0] || {};
			setAddressesList([...addresses, ...billing_addresses]);
		}
	}, [id, trigger]);

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
