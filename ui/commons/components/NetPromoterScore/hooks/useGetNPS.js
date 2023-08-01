import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';

const useGetNPS = () => {
	const [show, setShow] = useState();

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_nps_status',
	}, { autoCancel: false, manual: true });

	const getScore = useCallback(async () => {
		try {
			await trigger();
			setShow(data);
		} catch (e) {
			console.error(e);
		}
	}, [data, trigger]);

	useEffect(() => {
		getScore();
	}, [getScore]);

	return { loading, data, show, setShow };
};

export default useGetNPS;
