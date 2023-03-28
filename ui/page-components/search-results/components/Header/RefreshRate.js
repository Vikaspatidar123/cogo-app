import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { Button } from '@cogoport/front/components';
import { useEffect } from 'react';

import { Container } from './styles';

function RefreshRate({ detail = {}, refetch = () => {} }) {
	const { scope, query } = useSelector(({ general }) => ({
		scope : general?.scope,
		query : general.query,
	}));
	const updateSpotSearchAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_spot_search');

	const refresh = async () => {
		const params = {
			only_rates_update_required : true,
			id                         : detail?.spot_search_id,
		};
		await updateSpotSearchAPI.trigger({ params });
		if (typeof refetch === 'function') {
			refetch();
		}
	};

	useEffect(() => {
		if (query.refresh_rate) {
			refresh();
		}
	}, [query.refresh_rate]);

	return (
		<Container>
			<Button
				style={{ marginLeft: 8 }}
				disabled={updateSpotSearchAPI.loading}
				onClick={refresh}
			>
				{updateSpotSearchAPI.loading ? 'Refreshing ...' : 'Refresh Rate'}
			</Button>
		</Container>
	);
}

export default RefreshRate;
