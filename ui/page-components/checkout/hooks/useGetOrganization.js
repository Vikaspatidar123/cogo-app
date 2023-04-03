import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetOrganization = ({ organizationId }) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/get_organization',
			method : 'get',
		},
		{ manual: true },
	);

	const getOrganization = () => {
		if (organizationId) {
			trigger({ id: organizationId });
		}
	};

	useEffect(() => {
		getOrganization();
	}, []);

	return {
		loading,
		data,
		getOrganization,
	};
};

export default useGetOrganization;
