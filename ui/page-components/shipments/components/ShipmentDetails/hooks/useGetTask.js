import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetTask = ({ task = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_task_config',
		method : 'get',
	}, { manual: false });

	const getTask = async () => {
		const task_id = task?.id;

		try {
			await trigger({
				params: { pending_task_id: task_id },
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTask();
	}, [JSON.stringify(task?.id)]);

	return {
		data,
		loading,
	};
};

export default useGetTask;
