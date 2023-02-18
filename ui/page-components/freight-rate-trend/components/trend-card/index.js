import { useRouter } from '@cogo/next';
import React, { Fragment, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

// import { IcMCrossInCircle } from '@cogoport/icons-react';
import RightArrow from '../../../../common/icons/right-arrow.svg';
import { StepsComponent } from '../../../../common/ui';
import DeleteModal from '../../common/DeleteModal';
import useDeleteTrendSubscription from '../../hooks/useDeleteTrends';

import styles from './style.modules.css';
// import { useSaasState } from '../../../../common/context';
// import useFetchTrendsStoreQuota from '../../../../common/hooks/useFetchTrendsStoreQuota';

function TrendCard({ trend, isMobile }) {
	const { push } = useRouter();
	// const { setTrackerLimitModal, isTrackerLimitModalOpen } = useSaasState();
	// const { storeQuota } = useFetchTrendsStoreQuota(true);

	const { loading, deleteTrend } = useDeleteTrendSubscription();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	// const [trendId, setTrendId] = useState();

	const stepsList = [
		{ title: trend?.origin_port?.port_code || 'Origin' },
		{ title: trend?.destination_port?.port_code || 'Destination' },
	];

	// const handleTrackingLimitModal = () => {
	// 	setTrackerLimitModal(!isTrackerLimitModalOpen);
	// };

	const routeList = {
		origin      : trend?.origin_port?.name || 'Origin',
		destination : trend?.destination_port?.name || 'Destination',
	};

	return (
		<>
			<div className={styles.card}>
				<div className={styles.flex}>
					<div className={styles.flex_content}>
						<div className={styles.text}>
							{routeList.origin.split(' - ')[0]}
						</div>
						<div className={styles.text}>
							{routeList.destination.split(' - ')[0]}
						</div>
					</div>
					<StepsComponent stepsList={stepsList} />
					<div
						className={styles.footer}
						onClick={() => push(
							'/saas/freight-rate-trend/[trend_id]',
							`/saas/freight-rate-trend/${trend.id}`,
						)}
					>
						<div className={styles.text} size="12px" color="#4f4f4f">
							View details
						</div>
						<RightArrow style={{ height: 14, width: 14, marginLeft: 8 }} />
					</div>
				</div>
			</div>
			{showDeleteModal && (
				<DeleteModal
					// trendId={trendId}
					showDeleteModal={showDeleteModal}
					setShowDeleteModal={setShowDeleteModal}
					deleteTrend={deleteTrend}
					deleteLoading={loading}
					isMobile={isMobile}
				/>
			)}
		</>
	);
}

function TrendCardSkeleton() {
	return (
		<div className={styles.card}>
			<div style={{ padding: 16 }}>
				<Skeleton count={5} />
			</div>
			<div className={styles.footer}>
				<Skeleton count={1} style={{ width: '300px' }} />
			</div>
		</div>
	);
}

function EmptyTrendCard() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title} title>Welcome to Freight Rate Trends</div>
				<h4>What is it?</h4>
				<p>
					Freight Rate Trends feature helps you visualise the historical trends of basic
					freight.
				</p>
				<h4>What is it important?</h4>
				<p>
					Freight Rate Trends gives you the historical trends of basic freight for your
					requested port pair. You can also add in your rates to see what could be the
					savings if you would have booked the containers on Cogoport.
				</p>
				<h4>How do you search for Freight Rate Trends?</h4>
				<ul>
					<li>Enter the Port of Origin and Port of Destination</li>
					<li>Click on Search New Freight Trend</li>
				</ul>
				<p>You are done, and the historical data will be with you in seconds</p>
			</div>
		</div>
	);
}

export { EmptyTrendCard, TrendCardSkeleton };

export default TrendCard;
