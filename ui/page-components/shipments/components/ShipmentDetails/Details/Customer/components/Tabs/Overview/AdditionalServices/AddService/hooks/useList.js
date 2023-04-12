import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';

const useList = ({ shipment_id, services, isSeller = false, show }) => {
	const [filters, setFilters] = useState({
		name         : undefined,
		service_type : undefined,
	});
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_shipment_additional_service_codes',
		method : 'get',
	}, { manual: true });

	const getListApi = async () => {
		await trigger({
			params: {
				filters: {
					shipment_id,
				},
			},
		});
	};

	let intialList = (data?.list || []).map((item) => ({
		...item,
		shipment_id,
		services,
		isSeller,
		name: `${item.code} ${startCase(item.name)}`,
	}));

	if (filters.name) {
		intialList = intialList.filter((item) => item.name.toLowerCase().includes(filters.name.toLowerCase()));
	}

	if (filters.service_type) {
		intialList = intialList.filter(
			(item) => item.service_type === filters.service_type,
		);
	}

	useEffect(() => {
		if (shipment_id) {
			getListApi();
		}
	}, [shipment_id, show]);

	return {
		loading,
		apiList           : data,
		list              : intialList,
		serviceCountTotal : data?.length || 0,
		filters,
		setFilters        : (values) => setFilters({ ...filters, ...values }),
	};
};
export default useList;
