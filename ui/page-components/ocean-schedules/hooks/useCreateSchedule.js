import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateSchedule = () => {
	const { general, profile } = useSelector((state) => state);
	const { push } = useRouter();
	const [{ loading }, trigger] = useRequest({
		method: 'post',
		url: '/create_sailing_schedule_subscription',
	}, { manual: true });
	const createSchedule = async (origin, destination) => {
		try {
			const requestData = {
				origin_port_id: origin,
				destination_port_id: destination,
				performed_by_user_id: profile.id,
				organization_id: profile.organization.id,
				organization_branch_id: general?.query?.branch_id,
			};

			const res = await trigger({
				data: requestData,
			});

			if (res?.status === 200) {
				push(`/saas/ocean-schedules/${res?.data?.id}`);
			}

			const { data } = res;
			return data;
		} catch (err) {
			console.log(err?.message || 'Unable to create schedules. Please try again.');
			return {};
		}
	};

	return { loading, createSchedule };
};

export default useCreateSchedule;
