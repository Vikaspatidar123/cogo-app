import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useDeleteSchedule = ({ fetchSchedules, schedule = {} }) => {
	const [showDelete, setShowDelete] = useState(false);
	const { push } = useRouter();

	const handleViewDetails = () => {
		push(`/saas/air-schedules/${schedule?.id}`);
	};
	const { origin_airport = {}, destination_airport = {} } = schedule || {};

	const originSchedule = origin_airport?.port_code || 'Origin';

	const DestinationSchedule = destination_airport?.port_code || 'Destination';

	const origin_airport_name = origin_airport?.name.split('-')[0];

	const origin_airport_code = origin_airport?.name.split('-')[1];

	const destination_airport_name = destination_airport?.name.split('-')[0];

	const destination_airport_code = destination_airport?.name.split('-')[1];

	const [{ loading }, trigger] = useRequest({
		url    : '/delete_saas_air_schedule_subscription',
		method : 'post',
	}, { manual: true });

	const handleDelete = async () => {
		setShowDelete(!showDelete);
	};
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
		showDelete,
		setShowDelete,
		originSchedule,
		DestinationSchedule,
		origin_airport_name,
		origin_airport_code,
		destination_airport_name,
		destination_airport_code,
		handleViewDetails,
		handleDelete,
	};
};

export default useDeleteSchedule;
