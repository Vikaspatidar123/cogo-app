import { Toast } from '@cogoport/components';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useFetchPoc() {
	const { general } = useSelector((s) => s);
	const [pocList, setPocList] = useState([]);
	const [{ loading }, trigger] = useRequest({
		url    : 'list_saas_subscription_poc_details',
		method : 'get',
	}, { manual: true });
	const fetchPoc = async () => {
		try {
			const res = await trigger({
				params: {
					filters: { organization_branch_id: general?.query?.branch_id },
				},
			});
			// setLoading(false);
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setPocList(
				(data?.list ?? []).map((item) => {
					if (item.id) return item;
					return { ...item, id: nanoid(), tradeContact: true };
				}),
			);
		} catch (err) {
			console.log(err);
			Toast.error('Unable to fetch contacts. Please try again.');
			// setLoading(false);
		}
	};
	useEffect(() => {
		fetchPoc();
	}, []);

	return [
		loading,
		pocList,
		setPocList,
	];
}

export default useFetchPoc;
