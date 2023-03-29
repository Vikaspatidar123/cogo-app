import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useCreateAlerts = () => {
	const { query = {} } = useRouter();
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_update_saas_air_alert',
			method : 'post',
		},
		{ manual: true },
	);
	const createAlert = async (
		trackerId,
		shipper,
		consignee,
		alerts,
		containerAlertId,
	) => {
		try {
			const requestData = {
				saas_container_subscription_id : trackerId,
				shipper,
				consignee,
				performed_by_id                : '',
				alert_configuration            : alerts,
				organization_branch_id         : query?.branch_id,
			};
			if (containerAlertId) {
				requestData.id = containerAlertId;
			}
			const res = await trigger({ data: { ...requestData } });
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);
			const { data } = res;
			Toast.success(data?.message || 'Alerts Created Successfully');
			return data;
		} catch (err) {
			Toast.error(err?.message || 'Unable to create alert. Please try again.');
			return {};
		}
	};
	return { loading, createAlert };
};
export default useCreateAlerts;
