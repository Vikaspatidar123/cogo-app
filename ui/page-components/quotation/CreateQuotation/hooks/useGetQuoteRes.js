import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo, useRef } from 'react';

const useGetQuoteRes = ({ quoteRes = {}, getDraftData = {}, editData = {} }) => {
	const infoRef = useRef({});
	const { products: editDataProducts = [] } = editData || {};
	const { headerResponse = {}, lineItem = [] } = getDraftData || {};
	const { resultCurrency, destinationCountryCode, consignmentValue: totalValue } = headerResponse;

	const { product = {}, destinationPortDetails = {}, header } = quoteRes || {};
	const { products } = product;

	const consignmentValue = useMemo(() => (
		products?.reduce((prev, amount) => +prev + +amount.product_price, 0)
	), [products]);

	const updatedLineItem = useMemo(() => {
		const arr = lineItem.map((item) => {
			const matchedLineItem = editDataProducts.find((ele) => ele?.productId === item?.productId);
			return {
				...item,
				hsCode : matchedLineItem?.hsCode,
				name   : matchedLineItem?.name,
			};
		});
		return arr;
	}, [editDataProducts, lineItem]);

	useEffect(() => {
		if (!isEmpty(quoteRes) || !isEmpty(getDraftData)) {
			infoRef.current = {
				consignmentValue       : consignmentValue || totalValue,
				currency               : header?.currency || resultCurrency,
				product,
				productInfoArr         : product?.products || updatedLineItem,
				destinationPortDetails : isEmpty(destinationPortDetails)
					? { country_code: destinationCountryCode } : destinationPortDetails,

			};
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDraftData, quoteRes]);

	return {
		...infoRef.current,
	};
};

export default useGetQuoteRes;
