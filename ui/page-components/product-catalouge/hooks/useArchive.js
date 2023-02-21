import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';

const useArchive = ({
	proId,
	setArchive,
	refetchProduct,
	productClassificationId = undefined,
	subCategoryCount = 0,
	setActiveTab,
	card = false,
}) => {
	const [{ loading: putArchiveLoading }, PutArchiveTrigger] = useRequestBf({
		method  : 'put',
		url     : 'saas/product/archive',
		authKey : 'put_saas_product_archive',
	}, { manual: true });

	const refetchArchive = async () => {
		try {
			const response = await PutArchiveTrigger({
				params: { productId: proId },
			});
			if (response?.data?.message === 'Success') {
				setArchive(false);
				Toast.success('Product Archive Successfully !!');

				if (subCategoryCount > 1) {
					refetchProduct({ productClassificationId });
				} else {
					const productClassification = (!card && productClassificationId) || undefined;
					refetchProduct({ productClassificationId: productClassification });
					if (!card) setActiveTab('allProducts');
				}
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		refetchArchive,
	};
};

export default useArchive;
