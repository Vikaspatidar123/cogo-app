import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetOrganization = ({ organizationId }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const getOrganization = async () => {
		await trigger({ id: organizationId });
	};

	useEffect(() => {
		getOrganization();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId]);

	return {
		loading,
		data,
		getOrganization,
	};
};

export default useGetOrganization;
