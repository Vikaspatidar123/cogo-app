import { useState, useEffect, useMemo } from 'react';

import TrackerInfomation from './components';
import ListSaasSubscriptions from './hooks/useListSaasSubscription';

function TimeLineHorizontal({
	setQuickAction = () => {},
	servicesList = [],
}) {
	const [currentSubscription, setCurrentSubscription] = useState(null);

	const { data = {}, loading, setPage } = ListSaasSubscriptions();

	const { list = [], page = 0, page_limit = 0, total_count = 0 } = data || {};
	const container_data =	useMemo(() => list?.filter((item) => item?.type === 'CONTAINER_NO') || [], [list]);

	useEffect(() => {
		setCurrentSubscription(container_data?.[0]);
	}, [container_data]);

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
