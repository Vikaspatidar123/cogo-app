import { Toast } from '@cogoport/components';

import { constructScheduleString } from '../common/utils';

import { useRequest } from '@/packages/request';

const useCreateSchedule = ({ dsrs, setDsrs, dsrId }) => {
	const selectedDsr = dsrs?.filter?.((item) => item.id === dsrId)[0] || {};
	console.log(dsrId, 'selectedDsr', dsrId);
	const type = selectedDsr?.schedule == null ? 'new' : 'update';
	const [{ loading }, trigger] = useRequest({
		url    : type === 'new' ? 'create_dsr_schedule' : 'update_dsr_schedule',
		method : 'post',
	}, { manual: true });

	const createSchedule = async (frequency, day, time, updateState = true) => {
		try {
			const requestData = {
				...(type === 'new' && { saas_dsr_id: dsrId }),
				...(type === 'update' && { id: dsrId }),
				schedule_type  : frequency,
				schedule_value : day,
				schedule_time  : `${time}`,
			};
			const res = await trigger({ data: requestData });
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			if (updateState) {
				setDsrs((prevDsrs) => prevDsrs.map((dsr) => {
					if (dsr.id === dsrId) {
						return {
							dsr,
							schedule: constructScheduleString(frequency, day, time),
						};
					}
					return dsr;
				}));
			}

			return true;
		} catch (err) {
			Toast.error(err?.message || 'Unable to fetch schedules. Please try again.');
			return false;
		}
	};

	return { loading, createSchedule };
};

export default useCreateSchedule;
