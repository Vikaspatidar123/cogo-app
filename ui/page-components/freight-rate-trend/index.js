import { Pagination, Button } from '@cogoport/components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TrackingLimitModal from './common/tracking-limit';
import AddTrendModal from './components/add-trend-modal';
import SearchCard from './components/search-card';
import TrendCard, { EmptyTrendCard, TrendCardSkeleton } from './components/trend-card';
import useFetchTrends from './hooks/useFetchTrends';
import styles from './styles.module.css';

const trendLayout = ({
	isMobile,
	list,
	page, total, total_count,
}) => (list?.length > 0 ? (
	<>
		<div className={styles.flex_container}>
			{list.map((trend) => (
				<TrendCard trend={trend} key={trend.id} isMobile={isMobile} />
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
		freightTrends, isMobile, isTrackerLimitModalOpen, setTrackerLimitModal,
	} =		useSelector((state) => state);
	const {
		loading,
		pagination,
		setPagination,
		refectTrends,
		tredList = {},
	} = useFetchTrends({});
	const [isTrendModalOpen, setTrendModal] = useState(false);

	const handleTrendModal = () => {
		setTrendModal(!isTrendModalOpen);
	};

	const handleTrackingLimitModal = () => {
		setTrackerLimitModal(!isTrackerLimitModalOpen);
	};

	const {
		list, page, page_limit, total, total_count,
	} = tredList;

	const trendList = freightTrends?.list || [];

	if (isTrendModalOpen) {
		return <AddTrendModal refectTrends={refectTrends} handleModal={handleTrendModal} />;
	}

	if (isTrackerLimitModalOpen) {
		return (
			<TrackingLimitModal overflow="visible" closeModal={handleTrackingLimitModal} />
		);
	}
	return (
		<>
			{!isMobile && (
				<SearchCard refechTrends={refectTrends} />
			)}
			{isMobile && (
				<div className={styles.flex}>
					<div className={styles.text}>
						Freight Rate Trends
					</div>
				</div>
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
