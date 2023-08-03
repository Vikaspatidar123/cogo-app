import { Toast } from '@cogoport/components';

import getFormattedPayload from '../utils/getFormattedPayload';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useLeadUserDetails = ({ setLeadUserId = () => {}, t = () => {}, ipAddress }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_saas_sign_up_lead_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onLeadUserDetails = async (props) => {
		try {
			const payload = await getFormattedPayload(props);

			const response = await trigger({
				params : { request_ip: ipAddress },
				data   : payload,

			});

			const res = response.data || {};
			setLeadUserId(res?.id);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || t('authentication:signup_error_message'));
			setLeadUserId('');
		}
	};

	return { onLeadUserDetails, loading, fetchLeadUserTrigger: trigger };
};

export default useLeadUserDetails;
