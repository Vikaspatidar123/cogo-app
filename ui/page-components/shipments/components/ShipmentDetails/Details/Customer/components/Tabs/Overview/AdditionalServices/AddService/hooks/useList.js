// import { useRequest } from '@cogo/commons/hooks';
// import { useSelector } from '@cogo/store';
// import { startCase } from '@cogoport/front/utils';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
// import { useSelector } from '@/packages/store';

const useList = ({ shipment_id, services, isSeller = false, show }) => {
	// const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));

	const [filters, setFilters] = useState({
		name         : undefined,
		service_type : undefined,
	});
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_shipment_additional_service_codes',
		method : 'get',
	}, { manual: true });
	// const { trigger, loading, data } = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('get_shipment_additional_service_codes');

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
