import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetContract = (allParams) => {
	const { ...params } = allParams || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_contract',
		method : 'get',
	}, { manual: true });

	const getContract = () => trigger({
		params: {
			...params,
		},
	});

	useEffect(() => {
		getContract();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		contractData: data?.data || [],
	};
};

export default useGetContract;
