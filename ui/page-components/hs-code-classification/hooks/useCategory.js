import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCategory = ({ hsCode, hsCodeId, setShow }) => {
	const { profile } = useSelector((s) => s);
	const { id = '', organization = {} } = profile || {};
	const { country = {} } = organization || {};
	const [{ loading: getproductLoading, data: productDetails }, getproductTrigger] = useRequestBf({
		url    : '/saas/product/category',
		method : 'get',
	}, { manual: true });
	const [{ loading: addProductLoading }, addProductTrigger] = useRequestBf({
		url    : '/saas/product',
		method : 'post',
	}, { manual: true });
	const getProduct = useCallback(async () => {
		try {
			await getproductTrigger({
				params: {
					hsCode,
				},
			});
		} catch (err) {
			Toast.error('Something went wrong, Please try again');
			setShow(false);
		}
	}, [getproductTrigger, hsCode, setShow]);

	const addProduct = async (payload) => {
		try {
			const resp = await addProductTrigger({
				data: {
					organizationId  : organization?.id,
					currency        : country?.currency_code,
					originCountry   : country?.name,
					originCountryId : country?.id,
					userId          : id,
					...payload,
				},
			});
			return resp?.data?.id;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	const onSubmit = async (value) => {
		const {
			name, costPrice, sellingPrice, description = '', productImg = null,
		} = value;
		const payload = {
			hsCodeId,
			hsCode,
			costPrice,
			sellingPrice,
			name,
			description,
			logoUrl                 : productImg,
			productClassificationId : productDetails?.productClassificationId,
		};
		const resp = await addProduct(payload);
		if (resp) {
			Toast.success('Successfull added to Product Catalogue');
			setShow(false);
		} else {
			Toast.error('Something went wrong, Please try again');
		}
	};

	return {
		productDetails,
		getproductLoading,
		addProductLoading,
		onSubmit,
	};
};

export default useCategory;
