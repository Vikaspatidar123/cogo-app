import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

import { formatTime, format } from '../../utils';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { updateShipmentReport } from '@/ui/api/post';

const payLoad = ({ value, columns, userIds, reportData }) => ({
	id                   : reportData?.id,
	days                 : value?.days || undefined,
	schedule_time_zone   : value?.schedule_time_zone || undefined,
	recipient_user_ids   : userIds,
	schedule_time        : format(value?.schedule_time) || undefined,
	schedule_type        : value?.schedule_type || reportData?.schedule_type,
	service_wise_columns : columns,
	schedule_status      : value?.schedule_type === 'never' ? 'inactive' : undefined,
	dates                : value?.dates || undefined,

});
const useUpdate = ({ reportData, refetch, setEdit }) => {
	const {
		schedule_time_zone = '', days = '', schedule_time = '',
		dates, recipient_user_ids = [], schedule_type = 'never',
	} = reportData || {};

	const [columns, setColumns] = useState({ ...reportData?.service_wise_columns });

	const [userIds, setUserIds] = useState([...recipient_user_ids]);
	const [type, setType] = useState(schedule_type || 'never');

	const [reset, setReset] = useState(false);

	const formHooks = useForm();

	const { setValue } = formHooks || {};

	const { mutate, isLoading } = useMutation(updateShipmentReport, {
		onSuccess: () => {
			refetch();
			setEdit(false);
		},
		onError: (err) => {
			Toast.error(getApiErrorString(err?.response?.data));
		},
	});

	const onSubmit = (value) => {
		const payload = payLoad({ value, columns, userIds, reportData });
		mutate(payload);
	};
	useEffect(() => {
		if (reportData) {
			setType(schedule_type);
			refetch();
			setUserIds([...recipient_user_ids]);
			setColumns({
				...reportData?.service_wise_columns,
			});
			setValue('dates', dates);
			setValue('days', days);
			setValue('schedule_time_zone', schedule_time_zone);
			setValue('schedule_time', formatTime(schedule_time));
			setValue('schedule_type', schedule_type);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reset, schedule_type]);

	return {
		onSubmit,
		setColumns,
		columns,
		formHooks,
		setUserIds,
		userIds,
		isLoading,
		setReset,
		reset,
		type,
		setType,
	};
};
export default useUpdate;
