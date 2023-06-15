import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetListCoupons = () => {
	const { profile:{ organization } } = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_coupons',
	}, { manual: true, autoCancel: false });

	const getCoupons = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id : organization?.id,
					total_amount    : 10000,
					currency        : 'INR',
					category        : 'pay_later',
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [organization?.id, trigger]);

	useEffect(() => { getCoupons(); }, [getCoupons]);

	return { data, loading };
};

export default useGetListCoupons;
