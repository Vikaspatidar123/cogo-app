import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useGetRequestCallback = ({ profile }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_create_callback_for_plan_inquiry',
		method : 'post',
	}, { manual: true });

	const requestCallback = async () => {
		try {
			await trigger({
				data: {
					plan_name       : 'Enterprise Plan',
					organization_id : profile.organization.id,
					user_id         : profile.id,
				},
			});
			Toast?.success(
				"We've received your interest in this plan. Please expect a callback from us soon.",
			);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { requestCallback, callbackLoading: loading };
};

export default useGetRequestCallback;
