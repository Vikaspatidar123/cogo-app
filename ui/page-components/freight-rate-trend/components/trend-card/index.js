import { IcMCrossInCircle, IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import DeleteModal from '../../common/DeleteModal';
import useDeleteTrendSubscription from '../../hooks/useDeleteTrends';
import Stepper from '../Stepper';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TrendCard({ trend = {}, fetchLocations = () => {} }) {
	const { origin_port = {}, destination_port = {} } = trend || {};
	const { push } = useRouter();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [trendId, setTrendId] = useState();

	const routeList = {
		origin      : origin_port?.name?.split(' - ')[0] || 'Origin',
		destination : destination_port?.name?.split(' - ')[0] || 'Destination',
	};

	const { loading, deleteTrend } = useDeleteTrendSubscription({ fetchLocations });

	return (
		<>
			<div className={styles.card}>
				<div className={styles.flex}>
					<div className={styles.flex_content}>
						{Object.keys(routeList).map((route) => (
							<div className={styles.text} key={route}>
								{routeList?.[route]}
							</div>
						))}
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

					<Stepper originPort={origin_port} destinationPort={destination_port} />
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
				/>
			)}

		</>
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

export { EmptyTrendCard };

export default TrendCard;
