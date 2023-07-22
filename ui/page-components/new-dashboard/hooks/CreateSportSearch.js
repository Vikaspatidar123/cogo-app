import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const CreateSportSearch = () => {
	const { push } = useRouter();
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

	const fetchSearch = useCallback(async ({ payload }) => {
		try {
			const res = await trigger({
				data: payload,
			});

			console.log(res, 'data');

			const { data } = res || {};

			push(`/book/${(data || {}).id}`);
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [push, trigger]);

	return {
		fetchSearch,
		loading,
	};
};

export default CreateSportSearch;
