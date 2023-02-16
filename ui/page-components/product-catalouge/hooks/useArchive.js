import { toast } from '@cogoport/components';

// import { useSaasState } from '../../../common/context';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useArchive = ({
	proId,
	setArchive,
	refetchProduct,
	productClassificationId = undefined,
	subCategoryCount = 0,
	setActiveTab,
	card = false,
}) => {
	const { general } = useSelector((state) => state);
	const { scope } = general;
	const putArchive = useRequest('put', false, scope, {
		authkey: 'put_saas_product_archive',
	})('saas/product/archive');

	const refetchArchive = async () => {
		try {
			const response = await putArchive.trigger({
				params: { productId: proId },
			});
			if (response?.data?.message === 'Success') {
				setArchive(false);
				toast.success('Product Archive Successfully !!');

				if (subCategoryCount > 1) {
					refetchProduct({ productClassificationId });
				} else {
					const productClassification = (!card && productClassificationId) || undefined;
					refetchProduct({ productClassificationId: productClassification });
					if (!card) setActiveTab('allProducts');
				}
			}
		} catch (error) {
			toast.error(error?.message);
		}
	};
	return {
		refetchArchive,
	};
};

export default useArchive;
