import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateCogostoreCartItem = ({ getCogostoreCartItems }) => {
	const { profile } = useSelector((state) => state);
	const { cogopoint_id } = profile || {};

	const [{ loading, data }, trigger] = useRequest({
		url: '/update_cogostore_cart_item',
		method: 'post',
	}, { manual: true });

	const updateCogostoreCartItem = async ({
		id = '',
		quantity = 0,
		status = undefined,
	}) => {
		const payload = {
			id,
			quantity,
			cogopoint_user_id: cogopoint_id,
			status,
		};
		try {
			await trigger({
				params: { ...payload },
			});
			getCogostoreCartItems();
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		data,
		loading,
		updateCogostoreCartItem,
	};
};

export default useUpdateCogostoreCartItem;
