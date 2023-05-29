import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetDocumentsList = ({ filters = {} }) => {
	const { query } = filters || {};
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_organization_documents',
	}, { manual: true, autoCancel: false });

	const fetchDocuments = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
						query,
					},
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [query, trigger]);

	useEffect(() => {
		fetchDocuments();
	}, [fetchDocuments]);

	return { loading, data };
};

export default useGetDocumentsList;
