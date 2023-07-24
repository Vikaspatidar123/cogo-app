/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, cl } from '@cogoport/components';
import { IcMFitView } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import { isPastOrPresentDay } from '../../utils/daysconstant';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });

function TrackerMap({
	points = [],
	vesselLocationLat,
	vesselLocationLang,
	type,
	height = '80vh',
	isModal = false,
	markers = [],
	route = {},
	isGetSeaRoute = false,
}) {
	const [isTrackerMapModalOpen, setTrackerMapModal] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [curvePoints, setCurvePoints] = useState([]);
	const [completedPoints, setCompletedPoints] = useState([]);
	const [remainingPoints, setRemainingPoints] = useState([]);
	const isMobile = false;

	const latIndex = isGetSeaRoute ? 0 : 1;
	const lngIndex = isGetSeaRoute ? 1 : 0;

	let center = {};

	const resetPointAndMarkers = () => {
		setLoading(true);
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
					const ptArr = [
						p?.arrival_lat,
						p?.arrival_long,
						p?.departure_lat,
						p?.departure_long,
					];
					const isValidPtArr = ptArr.every((pt) => pt);

					if (isValidPtArr) {
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

						createBezier(
							[source, dest],
							0.001,
							isCurrentMilestonePastOrPresent,
							idx,
						);
						return true;
					}

					return false;
				});
				if (!res.includes(false)) {
					setTimeout(() => {
						setLoading(false);
					}, 0);
				}
			} else {
				points?.map((p) => {
					let c = p;
					if (typeof p[0] === 'object') {
						c = p.flat();
					}
					setRemainingPoints((prevPoints) => [
						...prevPoints,
						{
							lat : c[latIndex],
							lng : c[lngIndex],
						},
					]);
					setCurvePoints((prevPoints) => [
						...prevPoints,
						{
							lat : c[latIndex],
							lng : c[lngIndex],
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
	}, [points.length]);

	if (!isLoading && curvePoints.length > 0) {
		center = {
			lat : curvePoints[Math.ceil(curvePoints.length / 2)].lat,
			lng : curvePoints[Math.ceil(curvePoints.length / 2)].lng,
		};
	} else if (vesselLocationLat !== undefined && vesselLocationLat !== null) {
		center = {
			lat : vesselLocationLat,
			lng : vesselLocationLang,
		};
	}

	if (isTrackerMapModalOpen) {
		return (
			<Modal
				size="xl"
				onClose={() => setTrackerMapModal(!isTrackerMapModalOpen)}
				show={isTrackerMapModalOpen}
			>
				<div className={styles.modal_body}>
					<TrackerMap
						points={points}
						vesselLocationLat={vesselLocationLat}
						vesselLocationLang={vesselLocationLang}
						type={type}
						width="97%"
						height="70vh"
						isModal="true"
						markers={markers}
						isGetSeaRoute={isGetSeaRoute}
					/>
				</div>

			</Modal>
		);
	}

	return isLoading ? (
		<Image
			src={GLOBAL_CONSTANTS.image_url.map_loading}
			alt="map"
			height={70}
			width={70}
			className={isModal ? styles.image : ''}
		/>
	) : (
		<div className={cl`${styles.container} ${isMobile ? styles.mobile_view : ''}`}>
			{!isModal && points?.length !== 0 && (
				<IcMFitView
					className={styles.icon}
					onClick={() => setTrackerMapModal(!isTrackerMapModalOpen)}
				/>
			)}
			<div className={points?.length === 0 ? styles.blur_screen : ''}>
				<CogoMaps
					completedPoints={completedPoints}
					remainingPoints={remainingPoints}
					curvePoints={curvePoints}
					height={height}
					vesselLocationLat={vesselLocationLat}
					vesselLocationLang={vesselLocationLang}
					markers={markers}
					isMobile={isMobile}
					mapCenter={center}
				/>
			</div>
			{isEmpty(points) && (
				<div className={styles.loading_screen}>
					<div className={styles.map_unable}>Unable to load map for this shipment</div>

					<div className={styles.text_card}>
						{route?.tracking_label}
						{' '}
						:
						{' '}
						{route?.tracking_no}
					</div>
					<div className={styles.flex}>
						<div>{route?.origin_port || ''}</div>
						{route?.origin_port && (
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/union.svg"
								alt="union"
								// fill="black"
								style={{ margin: '18px' }}
							/>
						)}
						<div>{route?.destination_port || ''}</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default TrackerMap;
