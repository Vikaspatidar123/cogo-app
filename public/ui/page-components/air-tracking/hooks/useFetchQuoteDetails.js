import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchQuoteDetails = () => {
	const { general } = useSelector((s) => s);
	const { query } = general || {};
	const [quoteData, setQuoteData] = useState([]);
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_shipping_line_quotes_data_info',
			method : 'get',
		},
		{ manual: true },
	);
	const fetchQuoteDetails = async () => {
		const param = {};

		if (query?.trackingType === 'air') {
			param.airline_id = query?.airLineId;
		} else {
			param.shipping_line_id = query?.shippingLineId;
		}

		try {
			const res = await trigger({
				params: {
					...param,
					tracking_type: query?.trackingType?.toUpperCase() || null,
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		loading,
		quoteData,
		fetchQuoteDetails,
	};
};

export default useFetchQuoteDetails;
