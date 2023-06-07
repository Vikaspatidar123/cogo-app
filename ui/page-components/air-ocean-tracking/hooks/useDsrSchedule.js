import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import { useRequest } from '@/packages/request';

const useDsrSchedule = ({ dsrId = '', dsrList = [], selectedContact = {}, closeModalHandler }) => {
	const selectedContactDsr = useMemo(() => dsrList.filter((dsr) => (
		dsr?.poc_details?.id === selectedContact?.id
	))?.[0], [dsrList, selectedContact]);

	const { schedule: prevSchedule = '' } = selectedContactDsr || {};

	const url = useMemo(() => (
		prevSchedule ? '/update_dsr_schedule' : '/create_dsr_schedule'
	), [prevSchedule]);

	const [{ loading }, trigger] = useRequest({
		method: 'post',
		url,
	}, { manual: true });

	const createUpdateSchedule = async ({ data }) => {
		const { frequency, day = '', time } = data || {};
		const dsrKey = prevSchedule ? 'id' : 'saas_dsr_id';
		try {
			await trigger({
				data: {
					schedule_type  : startCase(frequency),
					schedule_value : startCase(day),
					schedule_time  : time,
					[dsrKey]       : dsrId,
				},
			});
			closeModalHandler();
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading, createUpdateSchedule, selectedContactDsr, prevSchedule,

	};
};

export default useDsrSchedule;
