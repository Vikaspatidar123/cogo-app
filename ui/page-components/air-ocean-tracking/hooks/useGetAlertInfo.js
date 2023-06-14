import { useRequest } from '@/packages/request';

const useGetAlertInfo = ({ shipmentId }) => {
	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/get_saas_container_alert',
		params : { saas_container_subscription_id: shipmentId },
	}, { manual: false });

	const [{ data: alertList, loading: alertListLoading }] = useRequest({
		method : 'get',
		url    : '/get_list_of_master_alerts',
	}, { manual: false });

	return {
		loading, data, alertList, alertListLoading,
	};
};

export default useGetAlertInfo;
