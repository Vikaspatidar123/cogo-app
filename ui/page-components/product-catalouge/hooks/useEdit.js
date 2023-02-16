import { toast } from '@cogoport/components';
import { useEffect } from 'react';

// import { useSaasState } from '../../../common/context';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useEdit = ({
	setShowProduct,
	refetchProduct,
	setHSCode,
	productClassificationId,
	subCategoryCount = 0,
	card,
	productId,
	setValue,
	isEdit,
	setActiveTab,
}) => {
	const { general, profile } = useSelector((state) => state);
	const { scope } = general;
	const { id: profileId = '', organization = {} } = profile || {};
	const [{ data, loading }, trigger] = useRequest({
		url     : 'saas/product',
		method  : 'get',
		authKey : 'get_saas_product',
	}, { manual: true });

	const refetchEdit = async () => {
		try {
			const resp = await trigger({
				params: { productId },
			});
			const {
				hsCode, name, costPrice, sellingPrice,
			} = resp.data || {};
			if (isEdit && resp.data) {
				setValue('hsCode', hsCode);
				setValue('name', name);
				setValue('costPrice', costPrice);
				setValue('sellingPrice', sellingPrice);
			}
		} catch (error) {
			toast.error(error?.message);
		}
	};

	const [{ loading: putEditLoading }, putEditTrigger] = useRequest({
		url     : 'saas/product',
		method  : 'put',
		authKey : 'put_saas_product',
	}, { manual: true });
	const [{ loading: addApiLoading }, AddApiTrigger] = useRequest({
		url     : '/saas/product',
		method  : 'post',
		authKey : 'post_saas_product',
	}, { manual: true });
	const refetchPutEdit = async ({ values, proId }) => {
		const {
			name, description, costPrice, sellingPrice, productImg,
		} = values || {};
		try {
			const resp = await putEditTrigger({
				data: {
					productId : proId,
					name,
					description,
					costPrice,
					sellingPrice,
					logoUrl   : productImg,
				},
			});
			if (resp?.data?.message === 'Success') {
				setShowProduct(false);
				toast.success('Product Edit Successfully !!');
				if (subCategoryCount > 1) {
					refetchProduct({ productClassificationId });
				} else {
					const productClassification = (!card && productClassificationId) || undefined;
					refetchProduct({ productClassificationId: productClassification });
					// if (!card) setActiveTab('allProducts');
				}
			}
			return resp;
		} catch (error) {
			toast.error(error.message);
			return null;
		}
	};
	const addProduct = async ({ item, countryName, pdId }) => {
		const { prefiledValues, pricingDetails, logoUrl = null } = item || {};
		try {
			const resp = await AddApiTrigger({
				data: {
					userId                  : profileId,
					organizationId          : organization?.id,
					...prefiledValues,
					...pricingDetails,
					logoUrl,
					originCountry           : countryName,
					currency                : organization?.country?.currency_code,
					productClassificationId : pdId,
				},
			});
			if (resp.data.message === 'Success') {
				refetchProduct({ productClassificationId });
				setShowProduct(false);
				setHSCode(false);
				toast.success('Product Created Successfully !!');
				setActiveTab('allProducts');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	useEffect(() => {
		if (productId) refetchEdit();
	}, [productId]);
	return {
		data,
		refetchEdit,
		editLoading: loading,
		refetchPutEdit,
		addProduct,
	};
};

export default useEdit;
