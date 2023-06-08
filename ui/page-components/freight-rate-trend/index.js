import { Pagination } from '@cogoport/components';
import React, { useEffect } from 'react';

import Loading from './common/Loading';
import SearchCard from './components/search-card';
import TrendCard, { EmptyTrendCard } from './components/trend-card';
import useFetchTrends from './hooks/useFetchTrends';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const trendLayout = ({
	list = [],
	page,
	total_count,
	fetchLocations = () => {},
	setPagination,
}) => (list?.length > 0 ? (
	<>
		<div className={styles.card_view}>
			<div className={styles.flex_container}>
				{list.map((trend) => (
					<TrendCard trend={trend} key={trend.id} fetchLocations={fetchLocations} />
				))}
			</div>
		</div>

		{list?.length > 0 && (
			<div className={styles.pagination_div}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={10}
					onPageChange={setPagination}
				/>
			</div>
		)}

	</>
) : (
	<EmptyTrendCard />
));
function FreightRateTrend() {
	const {
		freightTrends,
	} =		useSelector((state) => state);
	const {
		loading,
		pagination,
		setPagination,
		refectTrends,
		tredList = {},
		fetchLocations,
		filters,
	} = useFetchTrends({});

	const {
		list, page, page_limit, total, total_count,
	} = tredList;

	const trendList = freightTrends?.list || [];

	useEffect(() => {
		fetchLocations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, pagination]);

	return (
		<>
			<div className={styles.heading}>Freight Rate Trends</div>

			<SearchCard refechTrends={refectTrends} />

			{loading ? (
				<div className={styles.flex_container}>
					<Loading />
				</div>
			) : (
				trendLayout({
					trendList,
					pagination,
					setPagination,
					freightTrends,
					list,
					page,
					page_limit,
					total,
					total_count,
					fetchLocations,
				})
			)}
		</>
	);
}

export default FreightRateTrend;
