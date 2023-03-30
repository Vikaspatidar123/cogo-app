import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function RefreshRate({ detail = {}, refetch = () => {} }) {
	const { query } = useSelector(({ general }) => ({
		scope : general?.scope,
		query : general.query,
	}));

	const [{ loading }, updateSpotSearchAPI] = useRequest(
		{
			url    : 'update_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

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
		<div className={styles.container}>
			<Button
				style={{ marginLeft: 8 }}
				disabled={loading}
				onClick={refresh}
			>
				{loading ? 'Refreshing ...' : 'Refresh Rate'}
			</Button>
		</div>
	);
}

export default RefreshRate;
