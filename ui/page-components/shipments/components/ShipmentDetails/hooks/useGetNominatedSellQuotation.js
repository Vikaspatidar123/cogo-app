import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetNominatedSellQuotation = ({ shipmentId }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_shipment_sell_quotations',
		method : 'get',
	}, { manual: true });

	const getQuotations = async () => {
		await trigger({ params: { shipment_id: shipmentId } });
	};

	useEffect(() => {
		getQuotations();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipmentId]);

	return {
		loading,
		data,
		refetch: getQuotations,
	};
};

export default useGetNominatedSellQuotation;
