import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useDeleteDocument = ({ refetch = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : 'update_organization_document',
	}, { manual: true, autoCancel: false });

	const deleteDocument = async ({ item }) => {
		try {
			await trigger({
				data: { id: item?.id, status: 'inactive' },
			});

			Toast.success('Document Deleted Successfully');
			refetch();
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		deleteDocument,
		loading,
		data,
	};
};

export default useDeleteDocument;
