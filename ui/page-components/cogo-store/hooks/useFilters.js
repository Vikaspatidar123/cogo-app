import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFilter = ({ categoryId }) => {
	const [{ loading, data }, trigger] = useRequest({
		url: '/get_cogostore_filters',
		method: 'get',
	}, { manual: true });

	const getFilter = async (id = '') => {
		try {
			await trigger({
				params: { category_id: id || undefined },
			});
		} catch (err) {
			console.log('err', err);
		}
	};
	useEffect(() => {
		getFilter(categoryId);
	}, [categoryId]);

	return { loading, data };
};
export default useFilter;
