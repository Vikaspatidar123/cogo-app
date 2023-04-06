// import { useRequest } from '@cogo/commons/hooks';
// import { useSelector } from '@cogo/store';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetTask = ({ task = {}, onCancel = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_task_config',
		method : 'get',
	}, { manual: true });

	const getTask = async () => {
		const task_id = task?.id;

		try {
			const res = await trigger({
				params: { pending_task_id: task_id },
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (task?.id) {
			getTask();
		}
	}, [JSON.stringify(task?.id)]);

	return {
		data,
		loading,
	};
};

export default useGetTask;
