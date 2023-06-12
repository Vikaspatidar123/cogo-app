import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useGenerateDocument = ({
	shipment_data = {},
	task = '',
	refetch = () => {},
	clearTask = () => {},
}) => {
	const [{ loading:documentLoading, data }, listDocumentsTrigger] = useRequest({
		url    : 'list_shipment_documents',
		method : 'get',
	}, { manual: true });

	const [{ loading:pendingTaskLoading }, pendingTaskTrigger] = useRequest({
		url    : 'update_shipment_pending_task',
		method : 'post',
	}, { manual: true });

	const documentList = data?.list || [];
	const generateCertificate = async () => {
		const params = {
			shipment_id: shipment_data?.id,
		};
		try {
			await listDocumentsTrigger({
				params,
			});
		} catch (err) {
			Toast.error(err?.error?.message || err?.data?.error);
		}
	};

	const completeTask = async () => {
		try {
			const res = await pendingTaskTrigger({
				data: {
					id: task.id,
				},
			});
			if (!res?.hasError) {
				Toast.success('Task Completed Successfully');
				clearTask();
				refetch();
			} else {
				Toast.error('Something went wrong');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		documentList,
		pendingTaskLoading,
		documentLoading,
		completeTask,
		generateCertificate,
	};
};
export default useGenerateDocument;
