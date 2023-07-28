import getFormattedPayload from '../utils/getFormattedPayload';

import { useRequest } from '@/packages/request';

const useLeadUserDetails = ({ setLeadUserId = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_saas_sign_up_lead_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onLeadUserDetails = async (props) => {
		try {
			const payload = getFormattedPayload(props);

			const response = await trigger({
				data: payload,
			});

			const res = response.data || {};

			setLeadUserId(res?.id);
		} catch (err) {
			console.error(err);

			setLeadUserId('');
		}
	};

	return { onLeadUserDetails, loading, fetchLeadUserTrigger: trigger };
};

export default useLeadUserDetails;
