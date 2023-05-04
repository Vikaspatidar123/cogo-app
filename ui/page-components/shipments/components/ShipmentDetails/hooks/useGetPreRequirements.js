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
	}, []);

	const doc_data = data?.list?.[0] || {};

	return {
		doc_data,
		data,
		loading,
	};
};

export default useGetPreRequirements;
