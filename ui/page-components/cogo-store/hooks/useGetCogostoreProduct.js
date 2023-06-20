import { useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetCogostoreProduct = () => {
	const { profile } = useSelector((state) => state);
	const { cogopoint_id } = profile || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogostore_product',
		method : 'get',
	}, { manual: true });

	const getCogostoreProduct = useCallback(
		({ product_id = undefined }) => {
			if (!cogopoint_id) {
				return;
			}

			try {
				trigger({
					params: {
						id                : product_id,
						cogopoint_user_id : cogopoint_id,
					},
				});
			} catch (error) {
				console.log(error);
			}
		},
		[cogopoint_id, trigger],
	);

	return {
		data,
		loading,
		getCogostoreProduct,
	};
};
export default useGetCogostoreProduct;
