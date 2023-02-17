import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { useSaasState } from '../../../common/context';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useProductCatalogue = ({ archive = false, fetch = () => {}, setActiveTab }) => {
	const { profile } = useSelector((state) => state);
	const { id } = profile || {};
	const [apiData, setApiData] = useState({});
	const [pagination, setPagination] = useState({ page: 1 });
	const [{ loading: useProductLoading }, UseProducttrigger] = useRequest({
		url        : '/saas/product/list',
		method     : 'get',
		authKey    : 'post_saas_product',
		autoCancel : false,
	}, { manual: true });

	const [{ loading: addApiLoading }] = useRequest({
		url     : '/saas/product',
		method  : 'delete',
		authKey : 'delete_saas_product',
	}, { manual: true });

	const [{ loading: deleteProductApiLoading }, deleteProductTrigger] = useRequest({
		url     : '/saas/product',
		method  : 'delete',
		authKey : 'delete_saas_product',
	}, { manual: true });

	const refetchProduct = async ({
		productClassificationId = null,
		page = 1,
		sub = true,
	}) => {
		try {
			const response = await UseProducttrigger({
				params: {
					page,
					pageLimit       : 9,
					productClassificationId,
					organizationId  : profile.organization.id,
					originCountry   : profile.organization?.country?.name,
					originCountryId : profile.organization?.country?.country_id,
					archived        : archive,
				},
			});
			setApiData(response?.data);
			if (sub) fetch();
			return response.data?.list;
		} catch (error) {
			Toast.error(error.message);
			return null;
		}
	};

	const deleteProduct = async ({
		productId,
		productClassificationId = undefined,
		card,
		subCategoryCount = 0,
	}) => {
		try {
			const resp = await deleteProductTrigger({
				params: {
					productId,
					userId: id,
				},
			});

			if (resp.data.message === 'Success') {
				if (subCategoryCount > 1) {
					refetchProduct({ productClassificationId });
					fetch();
				} else {
					const productClassification = (!card && subCategoryCount > 1 && productClassificationId)
					|| undefined;
					refetchProduct({ productClassificationId: productClassification });
					if (!card) setActiveTab('allProducts');
					fetch();
				}

				Toast.success('Product Delete Successfully !!');
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	useEffect(() => {
		if (archive) refetchProduct({ page: pagination?.page });
	}, [pagination]);

	return {
		apiData,
		loading           : useProductLoading,
		refetchProduct,
		addProductLoading : addApiLoading,
		deleteProduct,
		setPagination,
	};
};

export default useProductCatalogue;
