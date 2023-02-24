import { IcMCrossInCircle, IcMArrowNext } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import DeleteModal from '../../common/DeleteModal';
import useDeleteTrendSubscription from '../../hooks/useDeleteTrends';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TrendCard({ trend = {}, isMobile }) {
	const { push } = useRouter();

	const { loading, deleteTrend, trendData } = useDeleteTrendSubscription();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [trendId, setTrendId] = useState();

	// const handleTrackingLimitModal = () => {
	// 	setTrackerLimitModal(!isTrackerLimitModalOpen);
	// };

	const routeList = {
		origin      : trend?.origin_port?.name || 'Origin',
		destination : trend?.destination_port?.name || 'Destination',
	};
	// console.log('asd');
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
						<div
							className={styles.cross_div}
							role="presentation"
							onClick={() => {
								setShowDeleteModal(true);
								setTrendId(trend.id);
							}}
						>
							<IcMCrossInCircle />
						</div>
					</div>
					<div className={styles.dot_circle}>
						<div className={styles.circle1} />
						<div className={styles.line} />
						<div className={styles.circle2} />
					</div>
					<div className={styles.port_code}>
						{trend?.origin_port?.port_code || 'Origin'}
						<div>
							{trend?.destination_port?.port_code || 'Destination' }
						</div>
					</div>
					<div
						role="presentation"
						className={styles.footer}
						onClick={() => push(
							'/saas/freight-rate-trend/[trend_id]',
							`/saas/freight-rate-trend/${trend.id}`,
						)}
					>
						<div className={styles.text} size="12px" color="#4f4f4f">
							View details
						</div>
						<IcMArrowNext style={{ height: 14, width: 14, marginLeft: 8 }} />
					</div>
				</div>
			</div>
			{showDeleteModal && (
				<DeleteModal
					trendId={trendId}
					showDeleteModal={showDeleteModal}
					setShowDeleteModal={setShowDeleteModal}
					deleteTrend={deleteTrend}
					deleteLoading={loading}
					isMobile={isMobile}
					trendData={trendData}

				/>
			)}
		</>
	);
}

function TrendCardSkeleton() {
	return (
		<div className={styles.card}>
			<div style={{ padding: 16 }}>
				{/* <Skeleton count={5} /> */}
			</div>
			<div className={styles.footer}>
				{/* <Skeleton count={1} style={{ width: '300px' }} /> */}
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
