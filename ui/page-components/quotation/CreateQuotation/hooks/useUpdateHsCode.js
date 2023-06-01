import { useRequestBf } from '@/packages/request';

const useUpdateHsCode = () => {
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'put',
		url     : '/saas/product/update-hscode',
		authKey : 'put_saas_product_update_hscode',
	}, { manual: true });

	const updateHsDataFn = async ({ productId = null, hsCodeId = null }) => {
		try {
			await trigger({
				data: {
					productId,
					hsCodeId,
				},
			});
		} catch (err) {
			console.log(err?.message);
		}
	};

	return {
		data,
		updateHsDataFn,
		updateHsLoading: loading,
	};
};
export default useUpdateHsCode;
