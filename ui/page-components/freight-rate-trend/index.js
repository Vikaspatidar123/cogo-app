import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import Loading from './common/Loading';
import SearchCard from './components/search-card';
import TrendCard, { EmptyTrendCard } from './components/trend-card';
import useFetchTrends from './hooks/useFetchTrends';
import styles from './styles.module.css';

function FreightRateTrend() {
	const { t } = useTranslation(['frt']);
	const {
		loading,
		pagination,
		setPagination,
		trendList = {},
		fetchLocations,
	} = useFetchTrends({});

	const { list = [], page, total_count } = trendList || {};

	useEffect(() => {
		fetchLocations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	return (
		<>
			<div className={styles.heading}>{t('frt:main_title')}</div>

			<SearchCard />

			{loading && (
				<div className={styles.flex_container}>
					<Loading />
				</div>
			)}

			{!loading && !isEmpty(list) ? (
				<>
					<div className={styles.card_view}>
						<div className={styles.flex_container}>
							{list.map((trend) => (
								<TrendCard trend={trend} key={trend.id} fetchLocations={fetchLocations} />
							))}
						</div>
					</div>
					<div className={styles.pagination_div}>
						<Pagination
							type="number"
							currentPage={page}
							totalItems={total_count}
							pageSize={10}
							onPageChange={setPagination}
						/>
					</div>
				</>
			) : (
				<EmptyTrendCard />
			)}
		</>
	);
}

export default FreightRateTrend;
