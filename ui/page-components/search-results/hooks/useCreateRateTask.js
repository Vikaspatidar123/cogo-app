import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useCreateRateTask = (allParams) => {
	const { ...params } = allParams;
	const { headerData = {}, data = {} } = params;

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_fcl_freight_rate_task',
			method : 'post',
		},
		{ manual: true },
	);

	const createApi = async () => {
		try {
			const payload = {
				service        : headerData?.service_type || data?.service_type,
				port_id        : headerData?.port_id || data?.port_id,
				main_port_id   : headerData?.main_port_id || data?.main_port_id,
				container_size : headerData?.container_size || data?.container_size,
				container_type : headerData?.container_type || data?.container_type,
				commodity      : headerData?.commodity || data?.commodity,
				trade_type     : headerData?.trade_type || data?.trade_type,
				shipping_line_id:
					headerData?.shipping_line_id || data?.shipping_line_id,
				source    : 'shipment',
				task_type : 'locals_at_actuals',
			};

			const res = await trigger({
				data: payload,
			});

			if (!res.hasError) {
				Toast.success('Job Created Successfully');
			}
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	const handleCreateJob = () => {
		createApi();
	};

	return {
		loading,
		handleCreateJob,
	};
};

export default useCreateRateTask;
