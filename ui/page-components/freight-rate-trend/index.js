import { Pagination, Button } from '@cogoport/components';
import React, { useState } from 'react';

import TrackingLimitModal from '../../common/components/tracking-limit';
import { useSaasState } from '../../common/context';
import withConfig from '../../common/utils/withConfig';

import AddTrendModal from './components/add-trend-modal';
import SearchCard from './components/search-card';
import TrendCard, { EmptyTrendCard, TrendCardSkeleton } from './components/trend-card';
import useFetchTrends from './hooks/useFetchTrends';
import styles from './style.modules.css';

// import useFetchTrendsStoreQuota from '../../common/hooks/useFetchTrendsStoreQuota';

const trendLayout = ({
	trendList = [],
	pagination,
	setPagination,
	freightTrends,
	isMobile,
}) => (trendList.length > 0 ? (
	<>
		<div className={styles.flex_container}>
			{trendList.map((trend) => (
				<TrendCard trend={trend} key={trend.id} isMobile={isMobile} />
			))}
		</div>
		<Pagination
			pagination={pagination}
			setPagination={setPagination}
			total={freightTrends?.total_count}
			pageLimit={10}
		/>
	</>
) : (
	<EmptyTrendCard />
));

function FreightRateTrend() {
	const {
		freightTrends, isMobile, isTrackerLimitModalOpen, setTrackerLimitModal,
	} =		useSaasState();
	const {
		loading,
		// filters,
		pagination,
		// setLoading,
		// setFilters,
		setPagination,
		refectTrends,
	} = useFetchTrends({});
	const [isTrendModalOpen, setTrendModal] = useState(false);
	// const { storeQuota } = useFetchTrendsStoreQuota(true);

	const handleTrendModal = () => {
		setTrendModal(!isTrendModalOpen);
	};

	const handleTrackingLimitModal = () => {
		setTrackerLimitModal(!isTrackerLimitModalOpen);
	};

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
					{/* <IconBack fill="white" style={{ height: 20, width: 20 }} onClick={back} /> */}
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

export default withConfig(FreightRateTrend);
