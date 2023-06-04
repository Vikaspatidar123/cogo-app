import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetLocationById = (id) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_locations',
		method : 'get',
	}, { manual: true });

	const params = {
		filters    : { id: [id] },
		includes   : { default_params_required: true },
		page_limit : 1,
	};

	useEffect(() => {
		trigger({ params });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {
		data,
		loading,
	};
};

export default useGetLocationById;
