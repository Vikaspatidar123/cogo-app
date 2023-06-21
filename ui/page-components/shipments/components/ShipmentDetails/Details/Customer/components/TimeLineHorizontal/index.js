import { useState, useEffect } from 'react';

import TrackerInfomation from './components';
import ListSaasSubscriptions from './hooks/useListSaasSubscription';

function TimeLineHorizontal({
	setQuickAction = () => {},
	servicesList = [],
}) {
	const [currentSubscription, setCurrentSubscription] = useState(null);

	const { data = {}, loading, setPage } = ListSaasSubscriptions();

	const { list = [], page = 0, page_limit = 0, total_count = 0 } = data || {};
	const container_data =	list?.filter((item) => item?.type === 'CONTAINER_NO') || [];
	useEffect(() => {
		setCurrentSubscription(container_data?.[0]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [container_data?.length]);

	return (
		<TrackerInfomation
			setQuickAction={setQuickAction}
			currentSubscription={currentSubscription}
			allContainers={container_data}
			setCurrentSubscription={setCurrentSubscription}
			loading={loading}
			servicesList={servicesList}
			page={page}
			pageLimit={page_limit}
			totalCount={total_count}
			setPage={setPage}
		/>
	);
}

export default TimeLineHorizontal;
