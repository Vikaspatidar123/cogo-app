import { Pagination, Button } from '@cogoport/components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SearchCard from './components/search-card';
import TrendCard, { EmptyTrendCard, TrendCardSkeleton } from './components/trend-card';
import useFetchTrends from './hooks/useFetchTrends';
import styles from './styles.module.css';

const trendLayout = ({
	isMobile,
	list = [],
	page,
	total,
	total_count,
	fetchLocations = () => {},
}) => (list?.length > 0 ? (
	<>
		<div className={styles.flex_container}>
			{list.map((trend) => (
				<TrendCard trend={trend} key={trend.id} isMobile={isMobile} fetchLocations={fetchLocations} />
			))}
		</div>

		{list?.length > 0 && (
			<div className={styles.pagination_div}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total}
					pageSize={total_count}
					isMobile={isMobile}
				/>
			</div>
		)}

	</>
) : (
	<EmptyTrendCard />
));
function FreightRateTrend() {
	const {
		freightTrends, isMobile,
	} =		useSelector((state) => state);
	const {
		loading,
		pagination,
		setPagination,
		refectTrends,
		tredList = {},
		fetchLocations,
	} = useFetchTrends({});
	const [isTrendModalOpen, setTrendModal] = useState(false);

	const handleTrendModal = () => {
		setTrendModal(!isTrendModalOpen);
	};

	const {
		list, page, page_limit, total, total_count,
	} = tredList;

	const trendList = freightTrends?.list || [];

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<>
			<div className={styles.heading}>Ocean Schedule Tracker</div>
			{!isMobile && (
				<SearchCard refechTrends={refectTrends} />
			)}
			{loading ? (
				<div className={styles.flex_container}>
					<TrendCardSkeleton key={1} />
					<TrendCardSkeleton key={2} />
				</div>
			) : (
				trendLayout({
					trendList,
					pagination,
					setPagination,
					freightTrends,
					isMobile,
					list,
					page,
					page_limit,
					total,
					total_count,
					fetchLocations,
				})
			)}
			{isMobile && (
				<Button
					variant="secondary"
					size="lg"
					onClick={() => handleTrendModal()}
				>
					+
				</Button>
			)}
		</>
	);
}

export default FreightRateTrend;
