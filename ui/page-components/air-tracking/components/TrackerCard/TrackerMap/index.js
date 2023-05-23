/* eslint-disable react-hooks/exhaustive-deps */
import { IcMOpenlink } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import MilestonesContainer from '../../tracker-details/MileStoneContainer';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });
const loading = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-ban.svg';
const load = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg';
function TrackerMap({
	points = [],
	height = '80vh',

}) {
	const [airPoints, setAirPoints] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [selectedContainerId, setSelectedContainerId] = useState(null);
	const [showTracker, setShowTracker] = useState(null);
	const [trackerLoading, setTrackerLoading] = useState(false);
	const [containerNumber, setContainerNumber] = useState(null);
	const [filter_points, setFilterPoints] = useState([]);
	const [timeouts, setAllTimeouts] = useState([]);
	const [airTrackerDetails, setAirTrackerDetails] = useState();

	const [isTrackerModalOpen, setTrackerModal] = useState(false);

	const handleTrackerModal = (flag = true) => {
		setTrackerModal(flag);
	};

	const createBezier = (inputPoints, step) => {
		let t = 0;
		const bezierPoints = [];
		while (t <= 1) {
			try {
				let x1;
				let x2;
				let x3;

				x1 = parseFloat(inputPoints[0].lat);
				x3 = parseFloat(inputPoints[1].lat);
				x2 = Math.max(x1, x3) + 20;
				const lat_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				x1 = parseFloat(inputPoints[0].lng);
				x3 = parseFloat(inputPoints[1].lng);
				x2 = (x1 + x3) / 2;
				const lng_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				bezierPoints.push({
					lat : lat_x,
					lng : lng_x,
				});
			} catch (err) {
				t = 1;
			}
			t += step;
		}
		return bezierPoints;
	};

	const setPointsOnMap = (point) => {
		if (point.service === 'air') {
			let curvePoints = [];
			point.route.map((p, index) => {
				if (
					![p.arrival_lat, p.arrival_long, p.departure_lat, p.departure_long].includes(
						null,
					)
					&& ![p.arrival_lat, p.arrival_long, p.departure_lat, p.departure_long].includes(
						undefined,
					)
				) {
					const source = {
						lat : p.departure_lat,
						lng : p.departure_long,
					};
					const dest = {
						lat : p.arrival_lat,
						lng : p.arrival_long,
					};
					curvePoints = curvePoints.concat(createBezier([source, dest], 0.001, point));
					const timeout = setTimeout(
						async () => {
							await setAirPoints((prevPoints) => [
								...prevPoints,
								{
									data  : point.data,
									id    : point.id,
									route : curvePoints,
								},
							]);
						},
						index === 0 ? 0 : 3000 * (index + 1),
					);
					setAllTimeouts((prevTimeout) => [...prevTimeout, timeout]);
					return true;
				}
				return false;
			});
		}
	};

	useEffect(() => {
		timeouts.map((timeout) => clearTimeout(timeout));
		setAirPoints([]);
		setTimeout(() => {
			setLoading(true);
		}, 0);
		filter_points.map((point, index) => {
			const timeout = setTimeout(
				() => {
					setPointsOnMap(point, index);
				},
				index === 0 ? 0 : 1000 * (index + 1),
			);
			setAllTimeouts((prevTimeout) => [...prevTimeout, timeout]);
			return true;
		});
		setTimeout(() => {
			setLoading(false);
		}, 0);
	}, [filter_points]);

	useEffect(() => {
		handleTrackerModal(false);
		setFilterPoints(points);
	}, [points]);

	const showTrack = (p) => {
		handleTrackerModal();
		setTrackerLoading(true);
		setFilterPoints(points.filter((x) => x.id === p.id));

		setShowTracker('air');
		setContainerNumber(p.data.input);
		const trackingContainersData = [
			{
				airway_bill_no : p.data.input,
				tracking_data  : p.data.data,
			},
		];
		const track_data = {
			...p,
			tracking_id : p.id,
			data        : trackingContainersData,
		};
		setAirTrackerDetails(track_data);
		setSelectedContainerId(p.data.input);
		setTimeout(() => {
			setTrackerLoading(false);
		}, 2000);

		return true;
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 0);
	}, [isTrackerModalOpen]);
	const renderMap = () => (
		<div className={points.length === 0 ? styles.blur_screen : ''}>
			<CogoMaps
				lengthDependency={isTrackerModalOpen}
				plotPoints={airPoints}
				type="air"
				showTrack={showTrack}
				height={height}
			/>
		</div>
	);
	return isLoading ? (

		<img
			src="https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg"
			alt=""
			height={height}
		/>
	) : (
		<div className={styles.container}>
			<div>
				{isTrackerModalOpen
					? (
						<>
							<div style={{ width: '100%', height: 'auto' }}>
								<div className={styles.flex} direction="row">
									<h3 style={{ marginTop: '-1px' }}> Tracking Information</h3>
									<text className={styles.text}>
										{showTracker === 'ocean'
											? `Container No: ${containerNumber}`
											: `Airway Bill No: ${containerNumber}`}
									</text>
									<IcMOpenlink
										fill="#000"
										style={{
											float       : 'right',
											marginRight : '1rem',
										}}
										size="0.7"
										onClick={() => {
											handleTrackerModal(false);
											setFilterPoints(points);
										}}
									/>
								</div>
							</div>

							<div>
								{!trackerLoading && (
									<div
										className={styles.flex}
									>
										<MilestonesContainer
											selectedContainerId={selectedContainerId}
											trackerDetails={airTrackerDetails}
											track
											renderMap={renderMap}
										/>
									</div>
								)}
								{trackerLoading && (
									<div className={styles.loading}>
										<div>
											<img
												src={loading}
												alt="loading"
												style={{ width: 300, height: 'auto' }}
											/>
										</div>
										<div>
											<text className={styles.text} size="14px">Retrieving Tracking Data</text>
										</div>
										<div>
											<img
												src={load}
												alt="...loading"
												style={{ width: 100, height: 'auto' }}
											/>
										</div>
									</div>
								)}

							</div>

						</>

					) : (
						renderMap()
					)}
			</div>

		</div>
	);
}

export default TrackerMap;
