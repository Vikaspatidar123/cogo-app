import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useListProductStore = (tags = undefined) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogostore_products',
		method : 'get',
	}, { manual: true });

	const getListProductStore = () => {
		try {
			trigger({
				params: {
					product_code_data_required : true,
					page_limit                 : 100,
					filters                    : { tags },
				},
			});
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getListProductStore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		loading,
	};
};
export default useListProductStore;
