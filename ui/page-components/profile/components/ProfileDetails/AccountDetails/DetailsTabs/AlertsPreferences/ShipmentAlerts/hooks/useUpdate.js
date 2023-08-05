import { useState } from 'react';
import { useMutation } from 'react-query';

import { formatTime, format } from '../../utils';

import { useForm } from '@/packages/forms';
import { updateShipmentReport } from '@/ui/api/post';

const payLoad = ({ value, columns, userIds, reportData }) => ({
	id                   : reportData?.id,
	days                 : value?.days || undefined,
	schedule_time_zone   : value?.schedule_time_zone || undefined,
	recipient_user_ids   : userIds,
	schedule_time        : format(value?.schedule_time) || undefined,
	schedule_type        : value?.type || reportData?.schedule_type,
	service_wise_columns : columns,
	schedule_status      : value?.type === 'never' ? 'inactive' : undefined,
	dates                : value?.dates || undefined,

});
const useUpdate = ({ reportData, refetch, setEdit }) => {
	const { schedule_time_zone = '', days = '', schedule_time = '', dates, recipient_user_ids = [] } = reportData || {};
	const [columns, setColumns] = useState({ ...reportData?.service_wise_columns });
	const [userIds, setUserIds] = useState([...recipient_user_ids]);
	const formHooks = useForm({
		defaultValues: { schedule_time_zone, schedule_time: formatTime(schedule_time), days, dates },
	});
	const { mutate, isLoading:loadind } = useMutation(updateShipmentReport, {
		onSuccess: () => {
			refetch();
			setEdit(false);
		},
	});

	const onSubmit = (value) => {
		console.log(value, 'value');
		const payload = payLoad({ value, columns, userIds, reportData });
		mutate(payload);
	};
	return { onSubmit, setColumns, columns, formHooks, setUserIds, userIds, loadind };
};
export default useUpdate;
