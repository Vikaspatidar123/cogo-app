import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequestBf } from '@/packages/request';

const useUnArchive = ({ proId, setArchive, refetchProduct }) => {
	const { t } = useTranslation(['common', 'productCatalogue']);
	const [{ loading: putArchiveLoading }, PutArchiveTrigger] = useRequestBf({
		method  : 'put',
		url     : 'saas/product/unarchive',
		authKey : 'put_saas_product_unarchive',
	}, { manual: true });

	const refetchUnArchive = async () => {
		try {
			const response = await PutArchiveTrigger({
				params: { productId: proId },
			});
			if (response.data.message === 'Success') {
				refetchProduct({});
				setArchive(false);
				Toast.success(t('productCatalogue:product_catalogue_toast_6'));
			}
		} catch (error) {
			Toast.error(error.message || t('productCatalogue:product_catalogue_toast_2'));
		}
	};
	return {
		refetchUnArchive,
		putArchiveLoading,
	};
};

export default useUnArchive;
