import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetOrganization = ({ organizationId }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const getOrganization = useCallback(() => {
		if (organizationId) {
			trigger({ id: organizationId });
		}
	}, [organizationId, trigger]);

	useEffect(() => {
		getOrganization();
	}, [getOrganization, organizationId]);

	return {
		loading,
		data,
		getOrganization,
	};
};

export default useGetOrganization;
