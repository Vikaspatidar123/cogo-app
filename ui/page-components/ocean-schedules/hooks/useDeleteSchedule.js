import { useRequest } from '@/packages/request';

const useDeleteSchedule = (refectSchedules) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'delete_sailing_schedule_subscription',
		method : 'post',
	}, { manual: true });

	const deleteSchedule = async (scheduleId) => {
		const response = await trigger({
			params: {
				sailing_schedule_subscription_id: scheduleId,
			},
		});
		if (response?.status === 200) {
			refectSchedules();
		}
	};

	return {
		deleteSchedule,
		loading,
	};
};

export default useDeleteSchedule;
