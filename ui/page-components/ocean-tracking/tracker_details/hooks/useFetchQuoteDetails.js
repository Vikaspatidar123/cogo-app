import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchQuoteDetails = () => {
	const { general } = useSelector((s) => s);
	const [quoteData, setQuoteData] = useState([]);
	const { query } = general;
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_shipping_line_quotes_data_info',
			method : 'get',
		},
		{ manual: true },
	);
	const fetchQuoteDetails = async () => {
		try {
			const res = await trigger({
				params: {
					shipping_line_id : query?.shippingLineId,
					tracking_type    : query?.trackingType?.toUpperCase() || null,
				},
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setQuoteData(data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchQuoteDetails();
	}, []);

	return {
		loading,
		quoteData,
		fetchQuoteDetails,
	};
};

export default useFetchQuoteDetails;
