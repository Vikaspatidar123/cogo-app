import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useAddDocuments = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : 'list_organization_documents',
	}, { manual: true, autoCancel: false });

	const addDocument = useCallback(async () => {
		try {
			trigger({
				data: {},
			});
		} catch (e) {
			console.log(e);
		}
	}, [trigger]);

	return { addDocument, loading, data };
};

export default useAddDocuments;
