import { Modal } from '@cogoport/components';
import { IcMLocation } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import { isPastOrPresentDay } from './utils';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function TrackerMap({
	points = [],
	mapLoading = false,
	vesselLocationLat,
	vesselLocationLang,
	type,
	height = '80vh',
	markers = [],
	route = {},
}) {
	const [isTrackerMapModalOpen, setTrackerMapModal] = useState(false);
	const [currentMilestone, setCurrentMilestone] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [curvePoints, setCurvePoints] = useState([]);
	const [completedPoints, setCompletedPoints] = useState([]);
	const [remainingPoints, setRemainingPoints] = useState([]);
	const RemainingPoint = points?.map((a) => ({
		lat : a[1],
		lng : a[0],
	}));
	const CurvePoint = points?.map((a) => ({
		lat : a[1],
		lng : a[0],
	}));
	const handleTrackerMapModal = () => {
		setTrackerMapModal(!isTrackerMapModalOpen);
	};

	const resetPointAndMarkers = () => {
		setLoading(true);
		setCurrentMilestone(false);
		setCurvePoints([]);
		setRemainingPoints([]);
		setCompletedPoints([]);
	};

	const createBezier = (inputPoints, step, isCurrentMilestonePastOrPresent) => {
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

		setCurvePoints((prevCurvePoints) => [...prevCurvePoints, ...bezierPoints]);
		if (isCurrentMilestonePastOrPresent) {
			setCompletedPoints((prevCompletedPoints) => [
				...prevCompletedPoints,
				...bezierPoints,
			]);
		} else {
			setRemainingPoints((prevRemainingPoints) => [
				...prevRemainingPoints,
				...bezierPoints,
			]);
		}
	};

	useEffect(() => {
		if (points?.length > 0) {
			if (type === 'air') {
				resetPointAndMarkers();
				const res = points?.map((p, idx) => {
					if (
						![p.arrival_lat, p.arrival_long, p.departure_lat, p.departure_long].includes(
							null,
						)
						&& ![p.arrival_lat, p.arrival_long, p.departure_lat, p.departure_long].includes(
							undefined,
						)
					) {
						const isCurrentMilestonePastOrPresent = isPastOrPresentDay(
							p.actual_arrival_time,
						);

						const source = {
							lat : p.departure_lat,
							lng : p.departure_long,
						};
						const dest = {
							lat : p.arrival_lat,
							lng : p.arrival_long,
						};
						if (isCurrentMilestonePastOrPresent) {
							setCurrentMilestone(dest);
						}
						createBezier([source, dest], 0.001, isCurrentMilestonePastOrPresent, idx);
						return true;
					}

					return false;
				});
				if (!res.includes(false)) {
					setTimeout(() => {
						setLoading(false);
					}, 0);
				}
			} else if (type === 'ocean_schedule') {
				setRemainingPoints(RemainingPoint);

				setCurvePoints(CurvePoint);
				setTimeout(() => {
					setLoading(false);
				}, 0);
			} else {
				points?.map((p) => {
					let c = p;
					if (typeof p[0] === 'object') {
						c = p.flat();
					}
					setRemainingPoints((prevPoints) => [
						...prevPoints,
						{
							lat : c[1],
							lng : c[0],
						},
					]);
					setCurvePoints((prevPoints) => [
						...prevPoints,
						{
							lat : c[1],
							lng : c[0],
						},
					]);
					return true;
				});
				setTimeout(() => {
					setLoading(false);
				}, 0);
			}
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 0);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [points?.length]);

	useEffect(() => {
		if (type === 'ocean_schedule' && curvePoints.length > 0) {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 0);
		}
	}, [curvePoints.length, markers, type]);

	if (isTrackerMapModalOpen) {
		return (
			<Modal
				show={isTrackerMapModalOpen}
				onClose={handleTrackerMapModal}
				placement="center"
			>
				<TrackerMap
					points={points}
					vesselLocationLat={vesselLocationLat}
					vesselLocationLang={vesselLocationLang}
					type={type}
					width="100%"
					height="60vh"
					isModal="true"
					markers={markers}
				/>
			</Modal>
		);
	}

	return isLoading || mapLoading ? (

		<img
			src="https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg"
			alt=""
			height={height}
		/>
	) : (
		<div className={styles.container}>
			<div className={points.length === 0 ? styles.blur_screen : ''}>
				<CogoMaps
					completedPoints={completedPoints}
					remainingPoints={remainingPoints}
					curvePoints={curvePoints}
					currentMilestone={currentMilestone}
					height={height}
					vesselLocationLat={vesselLocationLat}
					vesselLocationLang={vesselLocationLang}
					markers={markers}
				/>
			</div>
			{!mapLoading && points.length === 0 && (
				<div className={styles.loading_screen}>
					<div className={styles.map_unable}>
						Unable to load map for this Airline Cargo
					</div>

					<div className={styles.text_card}>
						{route?.tracking_label}
						:
						{route?.tracking_no}
					</div>
					<div className={styles.route}>
						<div>{route?.origin_port || ''}</div>
						{route?.origin_port && <IcMLocation fill="black" style={{ margin: '18px' }} />}
						<div>{route?.destination_port || ''}</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default TrackerMap;
