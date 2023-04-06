import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateSchedule = () => {
	const { general, profile } = useSelector((state) => state);
	const { scope } = general;
	const { push } = useRouter();
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_sailing_schedule_subscription',
	}, { manual: true });
	const createSchedule = async (origin, destination) => {
		try {
			let requestData = {};
			if (scope === 'partner') {
				requestData = {
					origin_port_id       : origin,
					destination_port_id  : destination,
					performed_by_user_id : profile.id,
					partner_id           : profile.partner.id,
				};
			} else {
				requestData = {
					origin_port_id         : origin,
					destination_port_id    : destination,
					performed_by_user_id   : profile.id,
					organization_id        : profile.organization.id,
					organization_branch_id : general?.query?.branch_id,
				};
			}

			const res = await trigger({
				data: requestData,
			});
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			if (res?.status === 200) {
				push(`/saas/ocean-schedules/${res?.data?.id}`);
			}

			const { data } = res;
			return data;
		} catch (err) {
			Toast.error(err?.message || 'Unable to create schedules. Please try again.');
			return {};
		}
	};

	return { loading, createSchedule };
};

export default useCreateSchedule;
