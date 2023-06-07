import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useAddedList = ({ shipment_id, shipment_data, filters = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_additional_services',
		method : 'get',
	}, { manual: true });

	const getListApi = async () => {
		await trigger({
			params: {
				performed_by_org_id : shipment_data?.importer_exporter_id,
				filters             : {
					shipment_id,

					...(filters || {}),
				},
			},
		});
	};

	useEffect(() => {
		if (shipment_id) {
			getListApi();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipment_id]);

	return {
		loading,
		list    : data?.list || [],
		refetch : getListApi,
	};
};
export default useAddedList;
