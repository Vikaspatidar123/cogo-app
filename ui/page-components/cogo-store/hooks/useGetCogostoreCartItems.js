import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetCogostoreCartItems = ({ only_count_required = false }) => {
	const { profile } = useSelector((state) => state);
	const { cogopoint_id } = profile || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogostore_cart',
		method : 'get',
	}, { manual: true });

	const getCogostoreCartItems = async () => {
		const payload = {
			cogopoint_user_id   : cogopoint_id,
			only_count_required : only_count_required || undefined,
		};
		try {
			await trigger({
				params: { ...payload },
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (cogopoint_id) {
			getCogostoreCartItems();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cogopoint_id]);
	return {
		data,
		loading,
		getCogostoreCartItems,
	};
};
export default useGetCogostoreCartItems;
