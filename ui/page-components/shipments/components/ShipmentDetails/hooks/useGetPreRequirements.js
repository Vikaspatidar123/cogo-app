import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetPreRequirements = (getEndPoint, params) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : getEndPoint,
		method : 'get',
	}, { manual: false });

	const getList = async () => {
		await trigger({ params });
	};

	useEffect(() => {
		getList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const doc_data = data?.list?.[0] || {};

	return {
		doc_data,
		data,
		loading,
	};
};

export default useGetPreRequirements;
