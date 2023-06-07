import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import getApiErrorString from '@/ui/commons/utils/getApiErrorString';

const useUpdateShipmentDocument = ({
	task,
	doc_data,
	remarkValue = '',
	onClose,
	refetch,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_document',
		method : 'post',
	}, { manual: true });

	const updateDocument = async (state) => {
		try {
			const payload = {
				id                  : doc_data.id,
				state,
				pending_task_id     : task.id,
				document_type       : doc_data.document_type,
				performed_by_org_id : task.organization_id,
				remarks:
					state === 'document_amendment_requested' ? [remarkValue] : undefined,
			};

			const response = await trigger({ data: payload });

			if (!response?.hasError) {
				onClose();
				refetch();
			} else {
				Toast.error('Something went wrong');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};
	return { updateDocument, loading };
};

export default useUpdateShipmentDocument;
