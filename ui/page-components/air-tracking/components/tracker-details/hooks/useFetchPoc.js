import { Toast } from '@cogoport/components';
import { nanoid } from 'nanoid';
import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useFetchPoc() {
	const { general } = useSelector((s) => s);
	const [pocList, setPocList] = useState([]);
	const [{ loading }, trigger] = useRequest({
		url    : 'list_saas_air_subscription_poc_details',
		method : 'get',
	}, { manual: true });
	const fetchPoc = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: { organization_branch_id: general?.query?.branch_id },
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setPocList(
				(data?.list || []).map((item) => {
					if (item.id) return item;
					return { ...item, id: nanoid(), tradeContact: true };
				}),
			);
		} catch (err) {
			Toast.error('Unable to fetch poclist. Please try again.');
		}
	}, [general?.query?.branch_id, trigger]);

	useEffect(() => {
		fetchPoc();
	}, [fetchPoc]);

	return {
		loading,
		pocList,
		setPocList,
	};
}

export default useFetchPoc;
