import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useTradeDetails = () => {
	const [selectedCountry, setSelectedCountry] = useState({});
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit',
		},
		{ manual: true },
	);

	const updateTradeDetails = async (values) => {
		try {
			const export_factoring_service_attributes = {
				status        : values.creditRequest.status,
				trade_details : values.trade_details,
				payment_terms : values?.payment_terms,
			};
			const payload = {
				export_factoring_service_attributes,
				credit_id: values.creditRequest.credit_id,
			};

			const response = await trigger({ data: payload });
			if (response.status === 200) {
				Toast.success('Trade Details Successfully saved');
				return true;
			}
			return false;
		} catch (err) {
			Toast.error(err.data);
			return false;
		}
	};
	return {
		updateTradeDetails,
		loading,
		data,
		selectedCountry,
		setSelectedCountry,
	};
};

export default useTradeDetails;
