import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetDocumentsList = ({ filters = {} }) => {
	const { query = '', documentTypeFilter = '', page = 1 } = filters || {};

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_organization_documents',
	}, { manual: true, autoCancel: false });

	const fetchDocuments = useCallback(async (val) => {
		try {
			await trigger({
				params: {
					filters: {
						status        : 'active',
						query,
						document_type : documentTypeFilter,
						...(val || {}),
					},
					page,
					page_limit: val?.service_type ? 30 : 10,
				},
			});
		} catch (e) {
			console.error(e);
		}
	}, [documentTypeFilter, page, query, trigger]);

	useEffect(() => {
		fetchDocuments();
	}, [fetchDocuments]);

	return { loading, data, refetch: fetchDocuments };
};

export default useGetDocumentsList;
