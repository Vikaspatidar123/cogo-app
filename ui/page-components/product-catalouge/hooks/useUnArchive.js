import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useUnArchive = ({ proId, setArchive, refetchProduct }) => {
	const putArchive = useRequest({
		method  : 'put',
		url     : 'saas/product/unarchive',
		authKey : 'put_saas_product_unarchive',
	}, { manual: true });

	const refetchUnArchive = async () => {
		try {
			const response = await putArchive.trigger({
				params: { productId: proId },
			});
			if (response.data.message === 'Success') {
				refetchProduct({});
				setArchive(false);
				Toast.success('Product UnArchive Successfully !!');
			}
		} catch (error) {
			Toast.error(error.message);
		}
	};
	return {
		refetchUnArchive,
	};
};

export default useUnArchive;
