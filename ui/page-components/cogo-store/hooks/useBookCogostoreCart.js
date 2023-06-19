import { useRequest } from '@/packages/request';

const useBookCogostoreCart = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/book_cogostore_cart',
		method : 'post',
	}, { manual: true });

	const [{ data: getOrderList }, getTrigger] = useRequest({
		url    : '/get_cogostore_order',
		method : 'get',
	}, { manual: true });

	const getTriggerData = async (data) => {
		try {
			await getTrigger({
				params: {
					id: data?.id,
				},
			});
			return true;
		} catch (error) {
			return false;
		}
	};

	const bookCogostoreCart = async ({ id = '', selectAddressId = '' }) => {
		const payload = {
			id,
			address_id: selectAddressId,
		};
		try {
			const res = await trigger({
				params: { ...payload },
			});
			const { data } = res || {};
			getTriggerData(data);
			return true;
		} catch (error) {
			return false;
		}
	};

	return {
		getOrderList,
		loading,
		bookCogostoreCart,
	};
};

export default useBookCogostoreCart;
