/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import useUpdateHsCode from './useUpdateHsCode';

const useProductField = ({
	selectedData = {}, productInfo = {}, productInfoArr = [], isUserSubscribed = false, productLineItemDetails = [],
	isQuotaLeft = false, verifyLoading = false, status, verifiedData = {}, verifyHandler, checkButton,
}) => {
	const {
		id: hsCodeId,
		// hsCode: selectedHsCode
	} = selectedData;
	const { productId = '', hsCode } = productInfo;
	const productLength = productInfoArr?.length;

	const lineItemLength = productLineItemDetails.length;

	const disableValidateBtn = (!isUserSubscribed && lineItemLength === 0
        && !isQuotaLeft) || verifyLoading || !status;

	const { updateHsDataFn } = useUpdateHsCode();

	useEffect(() => {
		if (checkButton) {
			verifyHandler(productId, verifiedData?.hsCode || hsCode);
		}
	}, [checkButton]);

	const updateHs = async () => {
		await updateHsDataFn({ productId, hsCodeId });
		// productInfoArr.forEach((product, index) => {
		// 	if (product?.productId === productId) {
		// setValue(`products.${index}.hsCode`, hsCode || selectedHsCode);
		// if (!isUserSubscribed && !quotaLeft) {
		// 	setLineItem((prev) => ({
		// 		...prev,
		// 		[productId]: {
		// 			...lineItem?.[productId],
		// 			destinationHs: selectedHsCode,
		// 		},
		// 	}));
		// }
		// }
		// });
	};
	useEffect(() => {
		if (hsCodeId) {
			updateHs();
		}
	}, [hsCodeId]);

	return {
		productLength,
		disableValidateBtn,
		lineItemLength,
	};
};

export default useProductField;
