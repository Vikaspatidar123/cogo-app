import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequestBf } from '@/packages/request';

const useArchive = ({
	proId,
	setArchive,
	refetchProduct,
	productClassificationId = undefined,
	setActiveTab,
	card = false,
}) => {
	const { t } = useTranslation(['common', 'productCatalogue']);

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
				Toast.success(t('productCatalogue:product_catalogue_toast_1'));
				const productClassification = (!card && productClassificationId) || undefined;
				refetchProduct({ productClassificationId: productClassification });
				if (!card) setActiveTab('allProducts');
			}
		} catch (error) {
			Toast.error(error?.message || t('productCatalogue:product_catalogue_toast_2'));
		}
	};
	return {
		refetchArchive,
		putArchiveLoading,
	};
};

export default useArchive;
