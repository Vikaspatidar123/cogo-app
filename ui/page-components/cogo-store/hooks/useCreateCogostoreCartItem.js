import { Toast } from '@cogoport/components';
import { useCallback, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateCogostoreCartItem = ({ getCogostoreCartItems }) => {
	const { profile } = useSelector((state) => state);
	const [addToCard, setAddToCard] = useState(false);
	const { cogopoint_id } = profile || {};

	const [{ loading }, trigger] = useRequest({
		url: '/create_cogostore_cart_item',
		method: 'post',
	}, { manual: true });

	const createCogostoreCartItem = useCallback(
		async ({ product_code_id = '', quantity = 0 }) => {
			const payload = {
				product_id: product_code_id,
				quantity,
				cogopoint_user_id: cogopoint_id,
			};
			try {
				const res = await trigger({
					params: { ...payload },
				});
				localStorage.setItem('cogostore_user_id', res.data.cogostore_cart_id);
				Toast.success('Product Added to Cart');
				setAddToCard(true);
				getCogostoreCartItems();
			} catch (error) {
				console.log(error);
			}
		},
		[cogopoint_id, trigger],
	);

	return {
		loading,
		createCogostoreCartItem,
		addToCard,
		setAddToCard,
	};
};

export default useCreateCogostoreCartItem;
