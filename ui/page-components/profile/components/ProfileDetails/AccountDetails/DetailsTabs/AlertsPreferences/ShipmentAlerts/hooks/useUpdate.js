import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

import { formatTime, format } from '../../utils';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { updateShipmentReport } from '@/ui/api/post';

const DEFAULT_DATE_DAYS = 1;

const DEFAULT_TIME = '10:00';

const DEFAULT_TIME_ZONE = 'Mumbai';

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

const useUpdate = ({ reportData = {}, refetch = () => {}, setEdit = false, refetchList = () => {} }) => {
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
			refetchList();
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
			setType(schedule_type || 'never');
			refetch();
			setUserIds([...recipient_user_ids]);
			setColumns({
				...reportData?.service_wise_columns,
			});
			setValue('dates', dates || [DEFAULT_DATE_DAYS]);
			setValue('days', days || [DEFAULT_DATE_DAYS]);
			setValue('schedule_time_zone', schedule_time_zone || DEFAULT_TIME_ZONE);
			setValue('schedule_time', formatTime(schedule_time || DEFAULT_TIME));
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
