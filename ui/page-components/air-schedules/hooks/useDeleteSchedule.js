import { useRequest } from '@/packages/request';

const useDeleteSchedule = (fetchSchedules) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'delete_saas_air_schedule_subscription',
		method : 'post',
	}, { manual: true });

	const deleteSchedule = async (scheduleId) => {
		const response = await trigger({
			params: { saas_air_schedule_subscription_id: scheduleId },
		});

		if (response?.status === 200) {
			fetchSchedules();
		}
	};

	return {
		deleteSchedule,
		loading,
	};
};

export default useDeleteSchedule;
