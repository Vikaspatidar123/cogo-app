import { useState, useEffect, useCallback } from 'react';

import { useRouter } from '@/packages/next';
import { request } from '@/packages/request/helpers/request';

const useContainerUpdateSubscription = () => {
	const { query } = useRouter();

	const [status, setStatus] = useState(true);

	const getContainerUpdateSubscription = useCallback(async () => {
		try {
			const res = await request.get('/get_container_update_subscription', { params: { id: query.id } });
			if (!res.hasError) {
				const resp = res.data.data.subscribed;
				setStatus(resp);
			}
		} catch (e) {
			console.error('e');
		}
	}, [query.id]);

	const onConfirm = () => {
		const res = request.post('unsubscribe_container_update_subscription', { id: query.id });
		if (!res.hasError) {
			getContainerUpdateSubscription();
		}
	};

	useEffect(() => {
		getContainerUpdateSubscription();
	}, [getContainerUpdateSubscription]);

	return { status, onConfirm };
};
export default useContainerUpdateSubscription;
