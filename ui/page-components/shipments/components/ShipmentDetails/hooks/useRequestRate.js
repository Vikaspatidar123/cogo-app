import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useRequestRate = ({ setShow = false, refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_additional_service',
		method : 'post',
	}, { manual: true });

	const requestRate = async (item) => {
		try {
			const addedService = (item.services || []).find(
				(service) => service.service_type === item.service_type,
			);
			await trigger({
				data: {
					name              : item?.name,
					code              : item.code,
					shipment_id       : item.shipment_id,
					service_type      : item.service_type,
					service_id        : addedService?.id,
					is_rate_available : false,
					state             : 'requested_for_importer_exporter',
				},
			});
			Toast.success('Rate Requested successfully');
			refetch();
			setShow(false);
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		loading,
		requestRate,
	};
};
export default useRequestRate;
