/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetProductClassificationId = ({
	setProductClassificationId,
	setProductDetailsfromApi,
	prefiledValues,
	refetchProduct,
}) => {
	const { profile } = useSelector((state) => state);
	const { organization = {}, id } = profile || {};
	const [{ loading }, trigger] = useRequestBf({
		url     : 'saas/product/category',
		method  : 'get',
		authKey : 'get_saas_product_category',
	}, { manual: true });
	const [{ loading: addProductLoading }, addApi] = useRequestBf({
		url     : '/saas/product',
		method  : 'post',
		authKey : 'post_saas_product',
	}, { manual: true });

	const getProductClassification = async () => {
		try {
			const response = await trigger({
				params: {
					hsCode: prefiledValues?.hsCode,

				},
			});
			setProductClassificationId(response?.data?.productClassificationId);
			setProductDetailsfromApi(response?.data);
		} catch (error) {
			console.error(error?.error?.message || 'Something Went Wrong');
		}
	};
	const addProduct = async (data, setShowProduct, pdId) => {
		const { prefiledValues: prefiled, pricingDetails, logoUrl = null } = data || {};
		try {
			const resp = await addApi({
				data: {
					userId                  : id,
					organizationId          : organization.id,
					...prefiled,
					...pricingDetails,
					logoUrl,
					originCountry           : organization?.country?.name || '',
					currency                : organization?.country?.currency_code,
					productClassificationId : pdId,
				},
			});
			if (resp.data.message === 'Success') {
				refetchProduct({});
				setShowProduct(false);
				Toast.success('Successfully added product');
				// setLabeledValue('list');
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	useEffect(() => {
		if (prefiledValues?.hsCode
		) getProductClassification();
	}, [prefiledValues?.hsCode]);
	return { loading, addProductLoading, addProduct };
};
export default useGetProductClassificationId;
